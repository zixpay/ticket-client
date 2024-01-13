import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { SellContext, type SellContextType } from '@/app/contexts/sell-context'
import { useFetchIp } from '@/app/hooks/use-fetch-ip'
import { normalizeCardNumber } from '@app/utils/format/card-number'
import { normalizeCardOwner } from '@app/utils/format/card-owner'
import { getLocalItem } from '@app/utils/get-local-item'
import { getMonthNumber } from '@app/utils/get-month-number'

import {
  type FeedbackResponse,
  type SubmitDataToSell,
} from '@views/contracts/submit-data'

type FocusedProps = 'name' | 'number' | 'expiry' | 'cvc' | ''

export interface PaymentSubmitData {
  cardNumber: string
  cardOwner: string
  cvc: string
  expiryMonth: string
  expiryYear: string
}

export const usePaymentController = () => {
  const navigate = useNavigate()

  const userIpAddress = useFetchIp()
  localStorage.setItem('@zixpay-user-ip-address', JSON.stringify(userIpAddress))

  const pageUrlRef = useRef(localStorage.getItem('@zixpay-page-url'))
  const id = pageUrlRef.current
  if (!id) {
    throw new Error('Invalid page.')
  }

  const paymentSchema = z.object({
    cardNumber: z
      .string({ description: 'O número do cartão é obrigatório.' })
      .length(19, 'O número do cartão deve ter 16 dígitos.')
      .transform((cardNumber) => {
        return cardNumber.replace(/\D/g, '')
      }),
    cardOwner: z
      .string({ description: 'O nome do titular é obrigatório.' })
      .transform((cardOwner) => {
        cardOwner = cardOwner.trim().replace(/\s+/g, ' ')
        const nameParts = cardOwner.split(' ')
        return nameParts.join(' ').toUpperCase()
      }),
    expiryMonth: z
      .string({ description: 'O mês de expiração é obrigatório.' })
      .transform((value) => {
        const monthNumber = getMonthNumber(value)
        return monthNumber || value
      }),
    expiryYear: z
      .string({ description: 'O ano de vencimento é obrigatório.' })
      .transform((year) => {
        return year.trim().slice(-2)
      }),
    cvc: z
      .string({ description: 'O cvc é obrigatório.' })
      .length(3, 'O cvc deve ter 3 dígitos.'),
  })

  type PaymentPageParams = z.infer<typeof paymentSchema>

  const [cardNumberValue, setCardNumberValue] = useState('')
  const [cardOwnerValue, setCardOwnerValue] = useState('')
  const [expiryMonthValue, setExpiryMonthValue] = useState('')
  const [expiryYearValue, setExpiryYearValue] = useState('')
  const [cvcValue, setCvcValue] = useState('')

  const {
    setValue,
    watch,
    register,
    getValues,
    control,
    handleSubmit: hookFormSubmit,
    formState: { errors, isValid },
  } = useForm<PaymentPageParams>({
    resolver: zodResolver(paymentSchema),
  })

  const watchForm = watch()

  useEffect(() => {
    if (watchForm.cardNumber) {
      setCardNumberValue(watchForm.cardNumber)
      setValue('cardNumber', cardNumberValue)
    }
    if (watchForm.cardOwner) {
      setCardOwnerValue(watchForm.cardOwner)
      setValue('cardOwner', cardOwnerValue)
    }
    if (watchForm.expiryMonth) {
      setExpiryMonthValue(watchForm.expiryMonth)
      setValue('expiryMonth', expiryMonthValue)
    }
    if (watchForm.expiryYear) {
      setExpiryYearValue(watchForm.expiryYear)
      setValue('expiryYear', expiryYearValue)
    }
    if (watchForm.cvc) {
      setCvcValue(watchForm.cvc)
      setValue('cvc', cvcValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue])

  const { setSellResponse } = useContext<SellContextType>(SellContext)

  const [focused, setFocused] = useState<FocusedProps>('')
  const [checked, setChecked] = useState(false)

  const cardNumberInput = watch('cardNumber')
  const [cardNumber, setCardNumber] = useState('')

  const cardOwnerInput = watch('cardOwner')
  const [cardOwner, setCardOwner] = useState('')

  const expiryMonth = watch('expiryMonth')
  const expiryYear = watch('expiryYear')
  const [expiry, setExpiry] = useState('')
  const cvc = watch('cvc')

  useEffect(() => {
    setCardNumber(normalizeCardNumber(cardNumberInput))
    const timerId = setTimeout(() => {
      setValue('cardNumber', cardNumber)
    }, 100)

    return () => {
      clearTimeout(timerId)
    }
  }, [cardNumber, cardNumberInput, setValue])

  useEffect(() => {
    setCardOwner(normalizeCardOwner(cardOwnerInput))
    const timerId = setTimeout(() => {
      setValue('cardOwner', cardOwner)
    }, 1000)

    return () => {
      clearTimeout(timerId)
    }
  }, [cardOwner, cardOwnerInput, setValue])

  useEffect(() => {
    const month = getMonthNumber(expiryMonth)
    const year = expiryYear?.trim()?.slice(-2)

    setExpiry(`${month}${year}`)
  }, [expiryMonth, expiryYear])

  function handleInputFocus(field: FocusedProps) {
    field === '' ? setFocused('') : setFocused(field)
  }

  function handleRadioValueChange() {
    checked ? setChecked(false) : setChecked(true)
  }

  const handleSubmit = hookFormSubmit(async (data) => {
    const { cardNumber, cardOwner, cvc, expiryMonth } = data

    if (!userIpAddress) {
      throw new Error('Ip address not found.')
    }

    const cardLastFourNumbers = cardNumber.slice(-4)

    localStorage.setItem(
      '@zixpay-card-number',
      JSON.stringify(cardLastFourNumbers),
    )

    const { quantity, full_value: fullValue } = getLocalItem(
      '@zixpay-home-payment',
    )
    const {
      document,
      name,
      birthdate,
      email,
      phone,
      zip_code: zipCode,
      state,
      city,
      street,
      number,
      complement,
    } = getLocalItem('@zixpay-checkout')

    const baseUrl = import.meta.env.VITE_API_URL

    const sellToken = localStorage.getItem('@zixpay-page-url')

    setSellResponse(null)
    navigate('/feedback')

    const reformatDate = (date: string) => {
      const pieces = date.split('/')
      return `${pieces[2]}-${pieces[1]}-${pieces[0]}`
    }

    function sanitizeNumber(value: string) {
      if (typeof value !== 'string') return value
      return value.replace(/\D/g, '')
    }

    try {
      const { data } = await axios.post<FeedbackResponse>(
        `${baseUrl}/establishments/sell`,
        {
          // Payment
          card_number: cardNumber,
          card_owner: cardOwner,
          cvc,
          expiry: `${expiryMonth}/${expiryYear}`,

          // Checkout
          document: sanitizeNumber(document),
          name,
          birthdate: reformatDate(birthdate),
          email,
          phone: sanitizeNumber(phone),
          zip_code: sanitizeNumber(zipCode),
          state: state.substring(0, 2),
          city,
          street,
          number,
          complement: complement ?? undefined,

          // Home
          quantity,
          full_value: fullValue,
          user_ip_address: userIpAddress,
          sell_token: sellToken,
        } as SubmitDataToSell,
      )

      console.log({
        // Payment
        card_number: cardNumber,
        card_owner: cardOwner,
        cvc,
        expiry: `${expiryMonth}/${expiryYear}`,

        // Checkout
        document: sanitizeNumber(document),
        name,
        birthdate: reformatDate(birthdate),
        email,
        phone: sanitizeNumber(phone),
        zip_code: sanitizeNumber(zipCode),
        state: state.substring(0, 2),
        city,
        street,
        number,
        complement: complement ?? undefined,

        // Home
        quantity,
        full_value: fullValue,
        user_ip_address: userIpAddress,
        sell_token: sellToken,
      })

      setSellResponse(data as unknown as boolean)
    } catch (err) {
      console.error(err)
    }
  })

  return {
    id,
    focused,
    checked,
    cardNumber,
    cardOwner,
    expiry,
    cvc,
    errors,
    isValid,
    control,
    register,
    getValues,
    handleInputFocus,
    handleRadioValueChange,
    handleSubmit,
  }
}
