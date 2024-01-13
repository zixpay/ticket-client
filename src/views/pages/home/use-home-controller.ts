import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { isAxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import { numericLineService } from '@app/services/numeric-line'
import { normalizeNumericLine } from '@app/utils/format/numeric-line'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export interface Installments {
  initial_value: string
  full_value: string
  quantity: number
  diff: string
  installments: string
}

export interface NumericLineData {
  document: string
  name: string
  value: string
  due_date: string
  fees: string
  fees_diff: string
  days_of_delay: number
  amount: string
  installments: Installments[]
}

export interface Installment {
  fullValue: string
  quantity: number
  installments: string
}

export const homeSchema = z.object({
  numericLine: z
    .string({ description: 'Código de barras é obrigatório.' })
    .regex(/^[0-9]+$/, 'O código do boleto deve conter apenas números.')
    .length(47, 'O código do boleto deve ter 47 dígitos.')
    .transform((value: string) => {
      return normalizeNumericLine(value)
    }),
})
export type HomePageParams = z.infer<typeof homeSchema>

export const useHomeController = () => {
  const navigate = useNavigate()

  const [openConfirmModal, setOpenConfirmModal] = useState(false)

  /*
   * Set page URL on localStorage
   */
  const { id } = useParams()
  if (!id) {
    throw new Error('Invalid page URL.')
  }
  useEffect(() => {
    localStorage.setItem('@zixpay-page-url', id)
  }, [id])

  /*
   * Zod validation
   */

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<HomePageParams>({
    resolver: zodResolver(homeSchema),
  })

  /*
   * Get numeric line information
   */
  const [validTicket, setValidTicket] = useState(false)

  const [numericLineInfo, setNumericLineInfo] = useState<NumericLineData>({
    document: '',
    due_date: '',
    name: '',
    value: '',
    amount: '',
    days_of_delay: 0,
    fees: '',
    fees_diff: '',
    installments: [],
  })

  const [installments, setInstallments] = useState<Installments[]>([])

  const [firstInstallment, setFirstInstallment] = useState<Installment>({
    quantity: 1,
    installments: installments[0]?.installments,
    fullValue: installments[0]?.full_value,
  })

  const [secondInstallment, setSecondInstallment] = useState<Installment>({
    quantity: 2,
    installments: installments[1]?.installments,
    fullValue: installments[1]?.full_value,
  })

  const [thirdInstallment, setThirdInstallment] = useState<Installment>({
    quantity: 3,
    installments: installments[2]?.installments,
    fullValue: installments[2]?.full_value,
  })

  /*
   * Ticket data to show
   */

  const [name, setName] = useState('')
  const [document, setDocument] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [daysOfDelay, setDaysOfDelay] = useState<number>(0)
  const [fees, setFees] = useState<string>('')
  const [feesDiff, setFeesDiff] = useState<string>('')
  const [ticketValue, setTicketValue] = useState('')
  const [diff, setDiff] = useState('')
  const [amount, setAmont] = useState('')
  const [initialValue, setInitialValue] = useState('')

  const [paymentOption, setPaymentOption] = useState<'one' | 'two' | 'three'>(
    'one',
  )

  /*
   * Handle submit
   */

  const numericLine = watch('numericLine')

  useEffect(() => {
    setValue('numericLine', normalizeNumericLine(numericLine))
  }, [numericLine, setValue])

  async function getTicket() {
    try {
      const info = localStorage.getItem('@zixpay-home-info')
      if (info !== null) {
        const parsedInfo = JSON.parse(info)
        if (parsedInfo.numericLine !== numericLine) {
          localStorage.removeItem('@zixpay-home-info')
          localStorage.removeItem('@zixpay-home-installments')
          localStorage.removeItem('@zixpay-home-payment')
        }
      }
      const response = await numericLineService.numericLine({
        numeric_line: numericLine,
        page_url: id!,
      })
      if (!isAxiosError(response)) {
        setNumericLineInfo(response)
        setInstallments(response?.installments)
        setValue('numericLine', numericLine)
        setName(numericLineInfo.name)
        setDocument(numericLineInfo.document)
        setDueDate(numericLineInfo.due_date)
        setDaysOfDelay(numericLineInfo.days_of_delay || 0)
        setFees(numericLineInfo.fees || '')
        setFeesDiff(numericLineInfo.fees_diff || '')
        setTicketValue(numericLineInfo.value)
        setAmont(numericLineInfo?.amount || '')
        setFirstInstallment(
          {
            quantity: 1,
            installments: response?.installments[0]?.installments,
            fullValue: response?.installments[0]?.full_value,
          } || { quantity: 1, installments: '', fullValue: '' },
        )
        setSecondInstallment(
          {
            quantity: 2,
            installments: response?.installments[1]?.installments,
            fullValue: response?.installments[1]?.full_value,
          } || { quantity: 1, installments: '', fullValue: '' },
        )
        setThirdInstallment(
          {
            quantity: 3,
            installments: response?.installments[2]?.installments,
            fullValue: response?.installments[2]?.full_value,
          } || { quantity: 1, installments: '', fullValue: '' },
        )
        setValidTicket(true)
      }
    } catch (error) {
      console.log(error)
      toast.error(
        'O boleto informado não está mais disponível para pagamento.',
        {
          style: {
            border: '1px solid #ef4444',
            padding: '8px',
            backgroundColor: '#FEF2F2',
          },
        },
      )
    }
  }

  /*
   * Save data on localStorage and navigate to checkout page
   */

  async function saveAndNavigate() {
    let chosenOption = 0
    switch (paymentOption) {
      case 'one':
        chosenOption = 0
        break
      case 'two':
        chosenOption = 1
        break
      case 'three':
        chosenOption = 2
        break

      default:
        chosenOption = 0
        break
    }

    const info = localStorage.getItem('@zixpay-home-info')
    if (info === null) {
      localStorage.setItem(
        '@zixpay-home-info',
        JSON.stringify({
          numericLine,
          days_of_delay: numericLineInfo.days_of_delay,
          document: numericLineInfo.document,
          due_date: numericLineInfo.due_date,
          fees: numericLineInfo.fees,
          fees_diff: numericLineInfo.fees_diff,
          name: numericLineInfo.name,
          value: numericLineInfo.value,
          diff: numericLineInfo.installments[chosenOption]?.diff,
          amount: numericLineInfo.amount,
          initial_value:
            numericLineInfo.installments[chosenOption]?.initial_value,
        }),
      )
    }

    const installment = localStorage.getItem('@zixpay-home-installments')
    if (installment === null) {
      localStorage.setItem(
        '@zixpay-home-installments',
        JSON.stringify({
          first_installment: firstInstallment,
          second_installment: secondInstallment,
          third_installment: thirdInstallment,
        }),
      )
    }

    const payment = localStorage.getItem('@zixpay-home-payment')
    if (payment === null) {
      localStorage.setItem(
        '@zixpay-home-payment',
        JSON.stringify({
          quantity: numericLineInfo.installments[chosenOption]?.quantity,
          installments:
            numericLineInfo.installments[chosenOption]?.installments,
          full_value: numericLineInfo.installments[chosenOption]?.full_value,
        }),
      )
    } else {
      localStorage.removeItem('@zixpay-home-payment')
      const installments = JSON.parse(installment!)

      const installmentsArray = [
        {
          quantity: installments.first_installment.quantity,
          installments: installments.first_installment.installments,
          fullValue: installments.first_installment.fullValue,
        },
        {
          quantity: installments.second_installment.quantity,
          installments: installments.second_installment.installments,
          fullValue: installments.second_installment.fullValue,
        },
        {
          quantity: installments.third_installment.quantity,
          installments: installments.third_installment.installments,
          fullValue: installments.third_installment.fullValue,
        },
      ]
      localStorage.setItem(
        '@zixpay-home-payment',
        JSON.stringify({
          quantity: installmentsArray[chosenOption]?.quantity,
          installments: installmentsArray[chosenOption]?.installments,
          full_value: installmentsArray[chosenOption]?.fullValue,
        }),
      )
    }

    navigate('/checkout')
  }

  /*
   * Update data on goback
   */

  const info = localStorage.getItem('@zixpay-home-info')
  const installment = localStorage.getItem('@zixpay-home-installments')

  let times = 0

  useEffect(() => {
    async function handleAutomaticlyPaste() {
      const clipboardText = await navigator.clipboard.readText()
      if (
        clipboardText.length > 45 &&
        clipboardText.length < 55 &&
        clipboardText.match(/^[0-9. ]+$/)
      ) {
        setOpenConfirmModal(true)
      }

      times++
      setTimeout(() => setOpenConfirmModal(false), 5000)
    }

    if (!numericLine && times === 0 && info === null) {
      handleAutomaticlyPaste()
    }
  }, [info, numericLine, times])

  useEffect(() => {
    if (info !== null && installment !== null) {
      const parsedInfo = JSON.parse(info)

      const parsedInstallment = JSON.parse(installment)

      setValue('numericLine', parsedInfo.numericLine)
      setValidTicket(true)
      setName(parsedInfo.name)
      setDocument(parsedInfo.document)
      setDueDate(parsedInfo.due_date)
      setDaysOfDelay(parsedInfo.days_of_delay)
      setFees(parsedInfo.fees)
      setFeesDiff(parsedInfo.fees_diff)
      setTicketValue(parsedInfo.value)
      setDiff(parsedInfo.diff)
      setAmont(parsedInfo.amount)
      setInitialValue(parsedInfo.initial_value)

      setFirstInstallment({
        quantity: parsedInstallment.first_installment.quantity,
        installments: parsedInstallment.first_installment.installments,
        fullValue: parsedInstallment.first_installment.fullValue,
      })
      setSecondInstallment({
        quantity: parsedInstallment.second_installment.quantity,
        installments: parsedInstallment.second_installment.installments,
        fullValue: parsedInstallment.second_installment.fullValue,
      })
      setThirdInstallment({
        quantity: parsedInstallment.third_installment.quantity,
        installments: parsedInstallment.third_installment.installments,
        fullValue: parsedInstallment.third_installment.fullValue,
      })
    }
  }, [info, installment, setValue])

  return {
    paymentOption,
    firstInstallment,
    secondInstallment,
    thirdInstallment,
    name,
    document,
    dueDate,
    daysOfDelay,
    fees,
    feesDiff,
    ticketValue,
    diff,
    initialValue,
    isValid,
    numericLineInfo,
    validTicket,
    errors,
    amount,
    openConfirmModal,
    trigger,
    register,
    setValue,
    getTicket,
    handleSubmit,
    saveAndNavigate,
    setPaymentOption,
    setOpenConfirmModal,
  }
}
