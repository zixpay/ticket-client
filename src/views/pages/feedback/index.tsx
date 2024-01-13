/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import flagsIcon from '@/assets/images/icons/flags.svg'
import mailIcon from '@/assets/images/icons/mail-icon.svg'
import phoneIcon from '@/assets/images/icons/phone-icon.svg'
import securityIcon from '@/assets/icons/aws-security.png'
import zixpayLogoWhite from '@/assets/images/logo-name-white.svg'
import zixpayLogo from '@/assets/images/logo-name.svg'
import { useSellContext } from '@app/hooks/use-sell-context'
import { establishmentServices } from '@app/services/establishment'
import { normalizeCnpj } from '@app/utils/format/cnpj'
import { normalizeName } from '@app/utils/format/name'
import { getAddress } from '@app/utils/get-address'

import { ErrorPage } from '@views/components/error-page'
import { Loader } from '@views/components/loader'
import { type RealEstateQuery } from '@views/contracts/real-estate'
import { FeedbackAnalysis } from '@views/pages/feedback/components/feedback-analysis'
import { FeedbackError } from '@views/pages/feedback/components/feedback-error'
import { FeedbackSuccess } from '@views/pages/feedback/components/feedback-success'
import { useFeedback } from '@views/pages/feedback/use-feedback'
import { useEffect, useState } from 'react'
import { normalizePhone } from '@app/utils/format/phone'

export const Feedback = () => {
  const { sellResponse } = useSellContext()

  const { id } = useFeedback()

  const { status, data }: RealEstateQuery = useQuery({
    queryKey: ['realEstateCheckout', id],
    queryFn: async () => await establishmentServices.establishmentUrl({ id }),
    staleTime: 1000 * 60 * 60,
  })

  if (status === 'loading') {
    return <Loader isLoading={true} />
  }

  if (status === 'error') {
    return <ErrorPage isError={true} />
  }

  const {
    fantasy_name: fantasyName,
    document,
    logo_url: logoUrl,
    email,
    phone,
  } = data

  const address = getAddress(data)

  const getLocalItem = (key: string) => {
    try {
      const storedData = localStorage.getItem(key)
      return storedData ? JSON.parse(storedData) : null
    } catch (error) {
      console.error('Error getting item from localStorage', error)
      return null
    }
  }

  const [finalFullValue, setFinalFullValue] = useState('')
  const [finalQuantity, setFinalQuantity] = useState(0)
  const [finalInstallments, setFinalInstallments] = useState('')
  const [finalCard, setFinalCard] = useState('')

  useEffect(() => {
    const {
      full_value: fullValue = '',
      quantity = 0,
      installments = '',
    } = getLocalItem('@zixpay-home-payment') || {}

    const card = localStorage.getItem('@zixpay-card-number') || ''

    setFinalFullValue(fullValue)
    setFinalQuantity(quantity)
    setFinalInstallments(installments)
    setFinalCard(card)
  }, [])

  return (
    <div className="flex h-full w-full flex-col">
      <header className="my-auto flex h-20 w-full items-center justify-between border-b border-white bg-gy-150 px-4 py-2 smx2:h-28 mdx3:px-10">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt="Logo imobiliária"
            className="h-14 w-28 rounded smx2:mr-2 smx2:h-20 smx2:w-40"
          />
        ) : (
          <div className="mt-1.5 flex h-14 w-28 items-center justify-center rounded font-bold uppercase text-gn-300 smx2:mr-2 smx2:h-20 smx2:w-max mdx3:text-2xl">
            {normalizeName(fantasyName)}
          </div>
        )}
        <div className="flex h-14 w-auto flex-col items-center justify-center smx2:flex-row">
          <div className="text-center text-[0.625rem] text-gy-400 smx2:text-sm mdx2:flex">
            <p className="flex text-center font-medium text-gy-500">
              CNPJ Imobiliária:
              <strong className="ml-1 text-gy-600 mdx2:mx-1">
                {normalizeCnpj(document)} -
              </strong>
            </p>
            <p className="font-medium text-gy-500">
              Processamento de Pagamento por:
            </p>
          </div>
          <Link to="/checkout">
            <img
              src={zixpayLogo}
              alt="Zixpay"
              className="mt-1 h-5 w-[3.75rem] self-end smx2:ml-2 smx2:h-10 smx2:w-28 smx2:self-center"
            />
          </Link>
        </div>
      </header>
      <div className="flex h-screen w-full flex-col bg-gy-50">
        <div className="flex h-full items-center justify-center">
          {sellResponse === null && <FeedbackAnalysis />}
          {sellResponse === true && (
            <FeedbackSuccess
              realEstate={normalizeName(fantasyName)}
              document={normalizeCnpj(document)}
              fullValue={finalFullValue}
              quantity={finalQuantity}
              installments={finalInstallments}
              card={finalCard}
              id={id}
            />
          )}
          {sellResponse === false && <FeedbackError id={id} />}
        </div>
      </div>
      <footer>
        <div className="flex w-full border-none bg-gy-600 px-4 py-8 text-white smx2:px-10 md:items-center md:justify-center mdx3:px-28">
          <div className="flex w-full max-w-[80rem] flex-col justify-start mdx3:flex-row">
            <div className="mb-10 flex w-full flex-col flex-wrap justify-between gap-10 smx2:flex-row mdx3:mb-0 mdx3:justify-start">
              <div className="w-full">
                <p className="mb-3 text-lg font-bold sm:text-2xl">
                  Imobiliária {normalizeName(fantasyName)}
                </p>
                <p className="mb-2 text-xs sm:text-base">
                  Para dúvidas ou suporte:
                </p>
                {email && (
                  <div className="mb-2 flex items-center hover:text-gray-50">
                    <img src={mailIcon} alt="Mail" />
                    <p className="ml-2 text-sm">{email}</p>
                  </div>
                )}
                {phone && (
                  <div className="mb-4 flex items-center hover:text-gray-50 sm:text-base">
                    <img src={phoneIcon} alt="Phone" />
                    <p className=" ml-2 text-sm">{normalizePhone(phone)}</p>
                  </div>
                )}
                {document && (
                  <p className="mb-2 text-xs leading-3 sm:text-sm">
                    CNPJ: {normalizeCnpj(document ?? '')}
                  </p>
                )}
                {address && (
                  <p className="break-words text-xs leading-3 sm:text-sm">
                    {address}
                  </p>
                )}
              </div>

              <div className="w-full">
                <p className="mb-3 text-lg font-bold sm:text-2xl">Segurança</p>
                <div className="flex">
                  <img src={securityIcon} alt="Segurança" className="w-14" />
                  <p className="mx-4 mt-3 break-words text-xs leading-4 b1:text-sm sm:text-base">
                    Ambiente seguro certificado SSL
                  </p>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col flex-wrap justify-between gap-10 smx2:flex-row mdx3:justify-start">
              <div className="w-full">
                <p className="mb-3 text-lg font-bold sm:text-2xl">Pagamento</p>
                <img src={flagsIcon} alt="Flags" />
              </div>

              <div className="w-full">
                <img
                  src={zixpayLogoWhite}
                  alt="Zixpay"
                  className="b1:w-28 sm:w-32"
                />
                <p className="my-2 text-xs leading-4 b1:text-sm sm:text-base">
                  Estamos somente intermediando o pagamento.
                </p>
                <p className="mb-2 break-words text-xs leading-4 b1:text-sm sm:text-base">
                  Para saber mais sobre o funcionamos, acesse nossos termos e
                  condições.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-0 w-full bg-gy-650 p-2">
          <div className="flex items-center justify-center">
            <p className="text-center text-[0.5rem] text-xs font-normal text-white b1:text-sm sm:text-base">
              &copy; 2023 Zixpay - CNPJ: 47.911.860/0001-40 - Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
