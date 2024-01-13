import { Fragment, useEffect } from 'react'
import { Controller } from 'react-hook-form'

import { useQuery } from '@tanstack/react-query'
import { SearchCheck } from 'lucide-react'

import { CheckIcon } from '@/assets/icons/check'
import { UnCheckIcon } from '@/assets/icons/uncheck'
import { establishmentServices } from '@app/services/establishment'
import { cn } from '@app/utils/cn'
import { getAddress } from '@app/utils/get-address'
import { useCheckoutController } from '@views/pages/checkout/use-checkout-controller'

import { Button } from '@views/components/button'
import { ErrorPage } from '@views/components/error-page'
import { Input } from '@views/components/input'
import { Loader } from '@views/components/loader'
import { RealEstateData } from '@views/components/real-estate-data'
import { SalesHeader } from '@views/components/sales-header'

import { MaskedInput } from '@views/components/masked-input'
import { type RealEstateQuery } from '@views/contracts/real-estate'
import { CkoSelect } from '@views/components/cko-select'
import { states } from '@/assets/data/states'
import { useLocation } from 'react-router-dom'

export const Checkout = () => {
  const {
    id,
    errors,
    control,
    isRecipientResponsible,
    register,
    isValid,
    setIsRecipientResponsible,
    saveInfoAndNavigate,
  } = useCheckoutController()

  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

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

  return (
    <div>
      <SalesHeader fantasyName={fantasyName} />
      <div className="bg-gy-50 mdx3:flex mdx3:items-start mdx3:justify-center">
        <main className="flex flex-col items-center justify-center px-2 pt-8 sm:px-10 md:ml-10 md:mr-10 md:items-start md:justify-center md:px-0 md:py-8">
          <div className="md: mr-0 w-full rounded bg-white px-3 pb-11 pt-6 sm:px-6 md:px-10">
            <strong className="text-lg font-bold text-gy-600">
              Dados do Pagador
            </strong>
            <form
              onSubmit={saveInfoAndNavigate}
              className="mx-auto mt-6 flex flex-col"
            >
              <MaskedInput
                label="CPF/CNPJ"
                className="mb-4"
                mask="document"
                control={control}
                placeholder="Digite seu CPF/CNPJ *"
                error={errors?.document?.message as string}
                {...register('document')}
              />

              <Input
                label="Nome completo"
                className="mb-4"
                placeholder="Digite seu nome completo *"
                error={errors?.name?.message as string}
                {...register('name')}
              />

              <MaskedInput
                label="Data de nascimento"
                className="mb-4"
                control={control}
                mask="99/99/9999"
                placeholder="Digite sua data de aniversário *"
                error={errors?.birthdate?.message as string}
                {...register('birthdate')}
              />

              <Input
                type="email"
                label="E-mail"
                className="mb-4"
                autoComplete="off"
                placeholder="Digite seu e-mail *"
                error={errors?.email?.message as string}
                {...register('email')}
              />

              <MaskedInput
                type="tel"
                label="Telefone"
                className="mb-10"
                control={control}
                mask="+55 (99) 99999-9999"
                autoComplete="off"
                placeholder="Digite seu telefone *"
                error={errors?.phone?.message as string}
                {...register('phone')}
              />

              <div
                className={cn(
                  'mb-2 flex h-full w-full flex-col rounded p-4 mdx3:max-w-[34rem]',
                  'sm:flex-row',
                  'bg-gy-50',
                  {
                    'pb-0 sm:flex sm:flex-col': isRecipientResponsible === 'no',
                  },
                )}
              >
                <div className="flex flex-col">
                  <p className="pr-4 text-sm text-gy-600 sm:mb-0 sm:pr-0 sm:text-base">
                    Responsável do pagamento é o próprio beneficiado?
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="flex items-center rounded bg-transparent py-4 text-xl text-gn-400"
                      onClick={() => setIsRecipientResponsible('yes')}
                    >
                      {isRecipientResponsible === 'yes' ? (
                        <CheckIcon className="h-6 w-6 rounded-full bg-white" />
                      ) : (
                        <UnCheckIcon className="h-6 w-6 rounded-full bg-white" />
                      )}
                      <p className="pl-4 font-semibold mdx3:pl-2">Sim</p>
                    </button>
                    <button
                      type="button"
                      className="flex h-16 w-full items-center rounded bg-transparent px-4 py-4 pl-14 text-xl text-gn-400"
                      onClick={() => setIsRecipientResponsible('no')}
                    >
                      {isRecipientResponsible === 'no' ? (
                        <CheckIcon className="h-6 w-6 rounded-full bg-white" />
                      ) : (
                        <UnCheckIcon className="h-6 w-6 rounded-full bg-white" />
                      )}
                      <p className="pl-4 font-semibold mdx3:pl-2">Não</p>
                    </button>
                  </div>
                </div>

                {isRecipientResponsible === 'no' && (
                  <Fragment>
                    <MaskedInput
                      label="CPF/CNPJ do beneficiado"
                      className="my-4"
                      control={control}
                      mask="document"
                      placeholder="CPF/CNPJ do beneficiado *"
                      style="bg-white"
                      error={errors?.recipientDocument?.message as string}
                      {...register('recipientDocument')}
                    />
                    <Input
                      label="Nome completo do beneficiado"
                      className="mb-4"
                      placeholder="Nome do beneficiado *"
                      style="bg-white"
                      error={errors?.recipientName?.message as string}
                      {...register('recipientName')}
                    />
                    <Input
                      type="email"
                      label="E-mail do beneficiado"
                      className="mb-4"
                      style="bg-white"
                      placeholder="E-mail do beneficiado *"
                      error={errors?.recipientEmail?.message as string}
                      {...register('recipientEmail')}
                    />
                    <MaskedInput
                      type="tel"
                      label="Telefone do beneficiado"
                      className="mb-4"
                      control={control}
                      mask="+55 (99) 99999-9999"
                      style="bg-white"
                      placeholder="Telefone do beneficiado *"
                      error={errors?.recipientPhone?.message as string}
                      {...register('recipientPhone')}
                    />
                    <MaskedInput
                      type="tel"
                      label="Data de nascimento do beneficiado"
                      className="mb-10"
                      control={control}
                      mask="99/99/9999"
                      style="bg-white"
                      placeholder="Aniversário do beneficiado *"
                      error={errors?.recipientPhone?.message as string}
                      {...register('recipientBirthdate')}
                    />
                  </Fragment>
                )}
              </div>
              <p className="pb-8 text-xs font-normal text-gy-600 sm:mb-0">
                Obs.: apenas se for a mesma pessoa.
              </p>

              <MaskedInput
                label="CEP"
                className="mb-4"
                control={control}
                mask="99.999-999"
                placeholder="Digite o seu CEP *"
                error={errors?.zipCode?.message as string}
                {...register('zipCode')}
              />

              <div className="mdx3:max-w-[34rem]">
                <div className="sm:flex sm:gap-8">
                  <div className="flex w-full flex-col">
                    <Controller
                      control={control}
                      name="state"
                      defaultValue=""
                      render={({ field: { onChange, value } }) => (
                        <CkoSelect
                          placeholder="Estado:"
                          onChange={onChange}
                          value={value}
                          error={errors.state?.message}
                          options={states.map((state) => ({
                            id: state.id,
                            uf: state.uf,
                            name: state.name,
                          }))}
                        />
                      )}
                    />
                  </div>

                  <Input
                    label="Cidade"
                    className="mb-4 sm:w-full"
                    placeholder="Digite a sua cidade *"
                    error={errors?.city?.message as string}
                    {...register('city')}
                  />
                </div>

                <Input
                  label="Bairro"
                  className="mb-4 sm:w-full"
                  placeholder="Digite o seu bairro *"
                  error={errors?.neighborhood?.message as string}
                  {...register('neighborhood')}
                />

                <Input
                  label="Rua"
                  className="mb-4 sm:w-full"
                  placeholder="Digite o seu endereço *"
                  error={errors?.street?.message as string}
                  {...register('street')}
                />

                <div className="sm:flex sm:gap-8">
                  <Input
                    label="Número"
                    className="mb-4 w-full sm:w-1/3"
                    placeholder="Número *"
                    error={errors?.number?.message as string}
                    {...register('number')}
                  />

                  <Input
                    label="Complemento"
                    className="mb-4 sm:w-full"
                    placeholder="Digite seu complemento"
                    error={errors?.complement?.message as string}
                    {...register('complement')}
                  />
                </div>
              </div>
              <Button
                icon={SearchCheck}
                text="SALVAR E CONTINUAR"
                disabled={!isValid}
              />
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
