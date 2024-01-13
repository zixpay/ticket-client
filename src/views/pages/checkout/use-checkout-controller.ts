/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { usersService } from '@app/services/user'
import { addressService } from '@app/services/address'

export interface ZipCodeData {
  zipCode: string
  city: string
  neighborhood: string
  state: string
  street: string
}

export const useCheckoutController = () => {
  const checkoutSchema = z.object({
    document: z
      .string({ description: 'O CPF/CNPJ é obrigatório.' })
      .min(14, { message: 'O CPF deve ter 11 dígitos.' })
      .max(18, { message: 'O CNPJ deve ter 14 dígitos.' })
      .refine((data) => data.length === 14 || data.length === 18, {
        message: 'O documento deve ter 11 dígitos (CPF) ou 14 dígitos (CNPJ).',
      }),
    name: z
      .string({ description: 'O nome completo é obrigatório.' })
      .trim()
      .regex(/^[a-zA-Z\s]+$/, { message: 'O nome deve conter apenas letras.' })
      .transform((name) =>
        name
          .split(' ')
          .map(
            (word) => word[0]?.toUpperCase() + word.substring(1).toLowerCase(),
          )
          .join(' '),
      ),
    birthdate: z
      .string({ description: 'A data de nascimento é obrigatória.' })
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, {
        message:
          'A data de nascimento deve conter apenas números e estar no formato DD/MM/AAAA.',
      }),
    email: z
      .string({ description: 'O email é obrigatório.' })
      .email('Este email é inválido.'),
    phone: z
      .string({ description: 'O número de telefone é obrigatório.' })
      .length(19, {
        message: 'O número de telefone deve ter 14 dígitos.',
      }),
    zipCode: z.string({ description: 'O CEP é obrigatório.' }),
    recipientDocument: z.string().optional(),
    recipientName: z.string().optional(),
    recipientEmail: z.string().optional(),
    recipientPhone: z.string().optional(),
    recipientBirthdate: z.string().optional(),
    state: z
      .string({ description: 'O estado é obrigatório.' })
      .min(2, { message: 'O estado deve ter 2 caracteres.' })
      .max(2, { message: 'O estado deve ter 2 caracteres.' }),
    city: z
      .string({ description: 'A cidade é obrigatória.' })
      .min(1, { message: 'O nome da cidade não pode estar vazio.' }),
    neighborhood: z
      .string({ description: 'O nome do bairro é obrigatório.' })
      .min(1, { message: 'O nome do bairro não pode estar vazio.' }),
    street: z
      .string({ description: 'O nome da rua é obrigatório.' })
      .min(1, { message: 'O nome da rua não pode estar vazio.' }),
    number: z
      .string({ description: 'O número é obrigatório.' })
      .min(1, { message: 'O número não pode estar vazio.' }),
    complement: z.string().optional(),
  })
  type CheckoutPageParams = z.infer<typeof checkoutSchema>

  const navigate = useNavigate()

  const pageUrlRef = useRef(localStorage.getItem('@zixpay-page-url'))

  const id = pageUrlRef.current
  if (!id) {
    throw new Error('Invalid page.')
  }

  const {
    control,
    trigger,
    register,
    setValue,
    getValues,
    setFocus,
    watch,
    formState: { errors, isValid },
  } = useForm<CheckoutPageParams>({
    mode: 'all',
    resolver: zodResolver(checkoutSchema),
  })

  const [isRecipientResponsible, setIsRecipientResponsible] = useState<
    'yes' | 'no'
  >('yes')

  const watchForm = watch()

  useEffect(() => {
    const sanitizeDocument = (doc: string) => doc.replace(/[ .-]/g, '')

    const { document, recipientDocument } = watchForm

    if (document?.length === 14 || document?.length === 17) {
      usersService
        .userUrl({ document: sanitizeDocument(document) })
        .then((res) => {
          if (res.type === 'user') {
            setValue('document', res?.data?.document)
            setValue('name', res?.data?.name)
            setValue('birthdate', res?.data?.birthdate)
            setValue('email', res?.data?.email)
            setValue('phone', res?.data?.phone)
            setValue('zipCode', res?.data?.zip_code)
            setValue('state', res?.data?.state)
            setValue('city', res?.data?.city)
            setValue('neighborhood', res?.data?.neighborhood)
            setValue('street', res?.data?.street)
            setValue('number', res?.data?.number)
            setValue('complement', res?.data?.complement)
          }
        })
        .catch((error) => {
          console.error('Erro ao obter dados do usuário:', error)
        })
    }

    if (recipientDocument?.length === 14 || recipientDocument?.length === 17) {
      usersService
        .userUrl({ recipientDocument: sanitizeDocument(recipientDocument) })
        .then((res) => {
          if (res.type === 'recipient') {
            setValue('recipientDocument', res?.data?.recipient_document)
            setValue('recipientName', res?.data?.recipient_name)
            setValue('recipientEmail', res?.data?.recipient_email)
            setValue('recipientPhone', res?.data?.recipient_phone)
            setValue('recipientBirthdate', res?.data?.recipient_birthdate)
          }
        })
        .catch((error) => {
          console.error('Erro ao obter dados do destinatário:', error)
        })
    }
  }, [watchForm?.document, watchForm?.recipientDocument])

  const [stateSelected, setStateSelected] = useState('')

  useEffect(() => {
    async function checkZipCode() {
      const zipCodeData = await addressService.address({
        zipCode: watchForm?.zipCode?.replace(/[ .-]/g, ''),
      })
      const { zip_code: zipCode, city, neighborhood, street } = zipCodeData
      setStateSelected(zipCodeData.state)
      setValue('zipCode', zipCode)
      setValue('city', city)
      setValue('neighborhood', neighborhood)
      setValue('street', street)
      setFocus('number')
    }
    setValue('state', stateSelected)

    if (watchForm?.zipCode?.length === 10) {
      checkZipCode()
    }
  }, [watchForm?.zipCode])

  useEffect(() => {
    async function discoverZipCode() {
      const userAddress = `${watchForm.state}/${watchForm.city}/${watchForm.street}`

      const { zip_code: zipCode } = await addressService.zipCode({
        userAddress,
      })
      setValue('zipCode', zipCode)
    }

    if (
      !watchForm.zipCode &&
      watchForm.state &&
      watchForm.city &&
      watchForm.street &&
      watchForm.street.includes(' ')
    ) {
      discoverZipCode()
    }
  }, [watchForm?.zipCode, watchForm.state, watchForm.city, watchForm.street])

  function saveInfoAndNavigate() {
    const {
      document,
      birthdate,
      city,
      email,
      name,
      number,
      phone,
      state,
      street,
      neighborhood,
      complement,
      recipientBirthdate,
      recipientDocument,
      recipientEmail,
      recipientName,
      recipientPhone,
      zipCode,
    } = getValues()

    const reformatDate = (date: string) => {
      const pieces = date.split('/')
      return `${pieces[2]}-${pieces[1]}-${pieces[0]}`
    }

    function sanitizeNumber(value: string) {
      if (typeof value !== 'string') return value
      return value.replace(/\D/g, '')
    }

    const dataToSave = {
      document: sanitizeNumber(document),
      name,
      birthdate: reformatDate(birthdate),
      email,
      phone: sanitizeNumber(phone),
      recipient_document: sanitizeNumber(recipientDocument ?? ''),
      recipient_name: recipientName || undefined,
      recipient_email: recipientEmail || undefined,
      recipient_phone: sanitizeNumber(recipientPhone ?? ''),
      recipient_birthdate: reformatDate(recipientBirthdate ?? ''),
      zip_code: sanitizeNumber(zipCode),
      state: state.substring(0, 2),
      city,
      neighborhood,
      street,
      number,
      complement: complement ?? undefined,
    }

    usersService.createUserUrl(dataToSave)

    const data = {
      document,
      name,
      birthdate,
      email,
      phone,
      recipient_document: recipientDocument,
      recipient_name: recipientName,
      recipient_email: recipientEmail,
      recipient_phone: recipientPhone,
      recipient_birthdate: recipientBirthdate,
      zip_code: zipCode,
      state,
      city,
      neighborhood,
      street,
      number,
      complement,
    }

    const info = localStorage.getItem('@zixpay-checkout')
    if (info !== null) {
      const parsedInfo = JSON.parse(info)
      if (parsedInfo === data) {
        navigate('/payment')
      } else {
        localStorage.removeItem('@zixpay-checkout')
        localStorage.setItem('@zixpay-checkout', JSON.stringify(data))
      }
    } else {
      localStorage.setItem('@zixpay-checkout', JSON.stringify(data))
    }

    navigate('/payment')
  }

  useEffect(() => {
    const info = localStorage.getItem('@zixpay-checkout')
    if (info !== null) {
      const {
        document,
        name,
        birthdate,
        email,
        phone,
        recipient_document: recipientDocument,
        recipient_name: recipientName,
        recipient_email: recipientEmail,
        recipient_phone: recipientPhone,
        recipient_birthdate: recipientBirthdate,
        zip_code: zipCode,
        state,
        city,
        neighborhood,
        street,
        number,
        complement,
      } = JSON.parse(info)

      setValue('document', document)
      setValue('name', name)
      setValue('birthdate', birthdate)
      setValue('email', email)
      setValue('phone', phone)
      setValue('recipientDocument', recipientDocument)
      setValue('recipientName', recipientName)
      setValue('recipientEmail', recipientEmail)
      setValue('recipientPhone', recipientPhone)
      setValue('recipientBirthdate', recipientBirthdate)
      setValue('zipCode', zipCode)
      setValue('state', state)
      setValue('city', city)
      setValue('neighborhood', neighborhood)
      setValue('street', street)
      setValue('number', number)
      setValue('complement', complement)
    }
  }, [setValue])

  return {
    id,
    errors,
    control,
    isRecipientResponsible,
    isValid,
    watch,
    getValues,
    trigger,
    register,
    setIsRecipientResponsible,
    saveInfoAndNavigate,
  }
}
