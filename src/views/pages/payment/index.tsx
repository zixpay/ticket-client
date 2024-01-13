import { useQuery } from '@tanstack/react-query'
import { CreditCard } from 'lucide-react'
import { Fragment } from 'react'
import { Controller } from 'react-hook-form'

import cardPayment from '@/assets/images/icons/mini-card.svg'
import { establishmentServices } from '@app/services/establishment'
import { normalizeName } from '@app/utils/format/name'
import { getAddress } from '@app/utils/get-address'
import { getLocalItem } from '@app/utils/get-local-item'
import { allMonths, next12Years } from '@app/utils/select-date'
import { type RealEstateQuery } from '@views/contracts/real-estate'
import '../../../../node_modules/react-credit-cards-2/dist/es/styles-compiled.css'
import '../../../assets/styles/payment-styles.css'

import { CheckIcon } from '@/assets/icons/check'
import { UnCheckIcon } from '@/assets/icons/uncheck'
import { Button } from '@views/components/button'
import { ErrorPage } from '@views/components/error-page'
import { Input } from '@views/components/input'
import { Loader } from '@views/components/loader'
import { RdxSelect } from '@views/components/rdx-select'
import { ReactCreditCard } from '@views/components/react-credit-card'
import { RealEstateData } from '@views/components/real-estate-data'
import { RecipientData } from '@views/components/recipient-data'
import { SalesHeader } from '@views/components/sales-header'
import { usePaymentController } from '@views/pages/payment/use-payment-controller'
import { MaskedInput } from '@views/components/masked-input'

export const Payment = () => {
  const {
    id,
    focused,
    checked,
    cardNumber,
    cardOwner,
    expiry,
    cvc,
    errors,
    isValid,
    register,
    control,
    handleInputFocus,
    handleRadioValueChange,
    handleSubmit,
  } = usePaymentController()

  const isAvailableToSubmit: boolean = !isValid || !checked

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

  const { fantasy_name: fantasyName, document, logo_url: logoUrl } = data

  const address = getAddress(data)

  const {
    quantity,
    installments,
    full_value: fullValue,
  } = getLocalItem('@zixpay-home-payment')

  return (
    <div>
      <SalesHeader fantasyName={fantasyName} />
      <div className="w-full bg-gy-50 md:flex md:items-start md:justify-center">
        <main className="pb-3 pt-4 md:mb-24 md:ml-10 md:pt-8">
          <RecipientData />
          <div className="mx-5 flex h-full  flex-col items-start rounded bg-white px-3 pb-10 pt-4 sm:mx-10 sm:px-6 md:mx-0 md:px-10">
            <Fragment>
              <strong className="mb-6 text-lg font-bold text-gy-600 sm:text-2xl">
                Pagamento
              </strong>
              <div className="mb-3 flex">
                <img src={cardPayment} alt="Card" className="sm:h-8 sm:w-10" />
                <small className="ml-3 text-gy-600 sm:mt-3 sm:text-base">
                  Cartão de Crédito
                </small>
              </div>
              <strong className="mb-3 text-2xl font-semibold text-gn-400 sm:text-3xl">
                R$ {fullValue}
              </strong>
              <p className="mb-8 text-gy-400 sm:text-base">
                Número de Parcelas:
                <p>
                  <strong className="mb-3 mr-1 text-xl font-semibold text-gn-400 sm:text-2xl">
                    {quantity}x
                  </strong>
                  de
                  <strong className="mb-3 ml-1 text-xl font-semibold text-gn-400 sm:text-2xl">
                    R$ {installments}
                  </strong>
                </p>
              </p>
            </Fragment>
            <ReactCreditCard
              cvc={cvc}
              name={cardOwner}
              number={cardNumber}
              expiry={expiry}
              focused={focused}
            />
            <form onSubmit={handleSubmit} className="flex w-full flex-col">
              <MaskedInput
                label="Número do cartão"
                className="mb-4"
                control={control}
                mask="9999 9999 9999 9999"
                placeholder="Digite o número do cartão *"
                error={errors?.cardNumber?.message as string}
                handleInputFocus={handleInputFocus as never}
                {...register('cardNumber')}
              />

              <Input
                label="Nome exibido no cartão"
                className="mb-4"
                autoComplete="off"
                placeholder="Digite o nome do cartão *"
                error={errors?.cardOwner?.message as string}
                handleInputFocus={handleInputFocus as never}
                {...register('cardOwner')}
              />

              <div className="gap-4">
                <div className="flex w-full gap-3">
                  <div className="flex w-full flex-col">
                    <Controller
                      control={control}
                      name="expiryMonth"
                      render={({ field: { onChange } }) => {
                        return (
                          <div>
                            <RdxSelect
                              placeholder="MM"
                              label="Mês"
                              options={allMonths}
                              error={errors?.expiryMonth?.message as string}
                              onChange={onChange}
                            />
                          </div>
                        )
                      }}
                    />
                  </div>
                  <div className="flex w-[65%] flex-col">
                    <Controller
                      control={control}
                      name="expiryYear"
                      render={({ field: { onChange } }) => {
                        return (
                          <div>
                            <RdxSelect
                              placeholder="AA"
                              label="Ano"
                              options={next12Years}
                              error={errors?.expiryYear?.message as string}
                              onChange={onChange}
                            />
                          </div>
                        )
                      }}
                    />
                  </div>
                </div>
                <MaskedInput
                  label="CVC"
                  className="mb-4 sm:w-full"
                  control={control}
                  mask="999"
                  placeholder="Ex.: 123 *"
                  autoComplete="off"
                  error={errors?.cvc?.message as string}
                  handleInputFocus={handleInputFocus as never}
                  {...register('cvc')}
                />
              </div>
              <div>
                <div className="mb-5 mt-2">
                  <p className="mb-8 text-base text-gy-500 sm:text-lg">
                    Detalhes do Pagamento:
                  </p>
                  <p className="text-sm sm:text-base">
                    {normalizeName(fantasyName)}
                    <strong className="mx-1">
                      • {quantity}x R$ ${installments}
                    </strong>
                    <span>
                      (<span className="font-bold">Total</span>: {fullValue}).
                    </span>
                  </p>
                </div>

                <div className="flex h-auto items-center">
                  <button
                    type="button"
                    className="flex w-full items-center rounded bg-transparent text-gn-400"
                    onClick={handleRadioValueChange}
                  >
                    {checked ? (
                      <CheckIcon className="h-6 w-6 rounded-full bg-white text-gn-400" />
                    ) : (
                      <UnCheckIcon className="h-6 w-6 rounded-full bg-white text-gn-400" />
                    )}
                    <p className="pl-4 text-left font-semibold text-black sm:text-lg">
                      Declaro e reconheço o pagamento
                    </p>
                  </button>
                </div>

                <Button
                  icon={CreditCard}
                  text="EFETUAR PAGAMENTO"
                  disabled={isAvailableToSubmit}
                />
              </div>
            </form>
          </div>
        </main>
        <RealEstateData
          logoUrl={logoUrl}
          fantasyName={fantasyName}
          document={document}
          address={address}
        />
      </div>
    </div>
  )
}
