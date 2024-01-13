import { Outlet, useParams } from 'react-router-dom'

import securityIcon from '@/assets/icons/aws-security.png'
import flagsIcon from '@/assets/images/icons/flags.svg'
import mailIcon from '@/assets/images/icons/mail-icon.svg'
import phoneIcon from '@/assets/images/icons/phone-icon.svg'
import zixpayLogoWhite from '@/assets/images/logo-name-white.svg'
import { establishmentServices } from '@app/services/establishment'
import { cn } from '@app/utils/cn'
import { normalizeCnpj } from '@app/utils/format/cnpj'
import { normalizeName } from '@app/utils/format/name'
import { normalizePhone } from '@app/utils/format/phone'
import { getAddress } from '@app/utils/get-address'
import { useQuery } from '@tanstack/react-query'
import { ErrorPage } from '@views/components/error-page'
import { Loader } from '@views/components/loader'
import { RealEstateQuery } from '@views/contracts/real-estate'
import { useEffect } from 'react'

export function HomeFeedbackLayout() {
  const { id } = useParams()

  if (!id) {
    throw new Error('Invalid page URL.')
  }

  useEffect(() => {
    localStorage.setItem('@zixpay-page-url', id)
  }, [id])

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
    phone,
    document,
    logo_url: logoUrl,
    email,
  } = data

  const address = getAddress(data)

  return (
    <div className="flex h-full w-full flex-col">
      <header
        className={cn(
          'flex h-auto w-full flex-wrap items-center justify-center border-b border-white bg-gy-150 py-2 pt-5 smx2:h-28 mdx3:px-10',
          'b1:flex-nowrap b1:justify-start b1:gap-3 b1:px-5 b1:pb-6 smx2:justify-between',
        )}
      >
        {logoUrl ? (
          <img
            src={logoUrl}
            alt="Logo imobiliária"
            className={cn(
              'object-fit rounded shadow',
              'b1:w-[45%] b2:w-[43%]',
              'rounded smx2:h-20 smx2:w-40',
            )}
          />
        ) : (
          <div
            className={cn(
              '',
              'mt-1.5 flex h-14 w-28 items-center justify-center rounded font-bold uppercase text-gn-300 smx2:h-20 smx2:w-max mdx3:text-2xl',
            )}
          >
            {normalizeName(fantasyName)}
          </div>
        )}

        <div className="mx-auto flex w-full flex-col items-center smx2:mx-0 smx2:w-fit">
          <div
            className={cn(
              'mt-4 w-full pb-2 text-center text-xs font-medium',
              'text-gy-500',
              'b2:text-sm sm:text-lg',
            )}
          >
            <p>
              CNPJ:
              <strong className="m-1 text-gy-600 mdx2:mx-1">
                {normalizeCnpj(document)}
              </strong>
            </p>
            <p>
              Processamento de Pagamento por:{' '}
              <strong className="text-gn-400">ZIXPAY</strong>
            </p>
          </div>
          {/* <img
              src={zixpayLogo}
              alt="Zixpay"
              className="mt-1 h-5 w-[3.75rem] self-end smx2:ml-2 smx2:h-10 smx2:w-28 smx2:self-center"
            /> */}
        </div>
      </header>

      <Outlet />
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
