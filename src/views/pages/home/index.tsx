import { Fragment } from 'react'

import { Divide, Plus, XCircle } from 'lucide-react'
import { CheckIcon } from '@/assets/icons/check'
import { UnCheckIcon } from '@/assets/icons/uncheck'
import { cn } from '@app/utils/cn'

import heroImage from '@/assets/images/hero-image.svg'

import { Button } from '@views/components/button'

import { useHomeController } from '@views/pages/home/use-home-controller'
import { PasteNumericLineModal } from '@views/components/paste-numeric-line-modal'

export const Home = () => {
  const {
    paymentOption,
    firstInstallment,
    secondInstallment,
    thirdInstallment,
    name,
    document,
    dueDate,
    daysOfDelay,
    // fees,
    feesDiff,
    ticketValue,
    // diff,
    initialValue,
    // amount,
    openConfirmModal,
    setOpenConfirmModal,
    isValid,
    numericLineInfo,
    validTicket,
    errors,
    trigger,
    register,
    setValue,
    getTicket,
    saveAndNavigate,
    setPaymentOption,
    handleSubmit,
  } = useHomeController()

  return (
    <div>
      <main className="flex h-full w-full flex-col items-center justify-center bg-gy-50 px-4 py-8 smx2:px-10 mdx3:px-28">
        <div
          className={cn(
            'b1:px-4',
            'mx:auto mb-4 flex max-w-[64rem] flex-col items-center smx2:mb-12 smx2:flex-row mdx3:px-6',
          )}
        >
          <div className="md:max-w-[37.5rem]">
            <h1 className="sm:font-mediumtext-gy-600 mb-6 text-3xl font-bold sm:mb-4 sm:text-6xl">
              Bem vindo!
            </h1>

            <p className="mb-6 break-words md:mb-4">
              <strong className="text-lg font-bold text-gy-600 sm:text-2xl">
                Para pagar ou dividir o valor do
                <span className="mx-1 text-gn-400 md:mx-1.5">
                  boleto do alugel
                </span>
                ou <span className="text-gn-400">condomínio</span>, é fácil e
                seguro.
              </strong>
            </p>
            <p className="break-words text-neutral-600 sm:text-lg">
              Basta digitar o código de barras, escolher quantas vezes deseja
              parcelar e inserir os dados do cartão de crédito. <br /> É
              simples, rápido e confiável!
            </p>
          </div>
          <img
            src={heroImage}
            alt="Hero Image"
            className="my-6 h-48 w-48 smx2:ml-6 smx2:mt-0 smx2:h-64 smx2:w-64 md:ml-12 md:h-[22.875rem] md:w-[22.875rem] mdx2:ml-16"
          />
        </div>
        <form
          onSubmit={handleSubmit(getTicket)}
          className="h-full w-full max-w-[80rem] rounded bg-white px-4 py-6 text-gy-600 shadow sm:mx-12 sm:px-6 md:mx-32 md:px-8 md:pt-6"
        >
          <p className="text-lg font-bold ">Adicionar Boleto</p>
          <div className="flex flex-col">
            <p className="my-2 mt-4 text-sm">Código de barra do boleto:</p>
            <div className="md: flex flex-col md:flex-row md:items-center">
              <div className="flex w-full flex-col justify-end">
                <input
                  type="text"
                  maxLength={52}
                  minLength={47}
                  className={cn(
                    'mb-1 w-full self-center rounded border-2 bg-gy-50 px-6 py-4 text-base font-medium placeholder-gy-600 outline-none focus:border-gn-300 sm:mb-6 md:mb-0',
                    errors.numericLine && '!border-red-900',
                  )}
                  placeholder="Digite o código de barra"
                  {...register('numericLine')}
                />
                {errors.numericLine && (
                  <div className="mt-2 flex items-center gap-2 text-red-900">
                    <XCircle />
                    <span className="text-xs">
                      {errors?.numericLine?.message as string}
                    </span>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="group mb-1 mt-4 flex h-[60px] w-full items-center justify-center self-end rounded border-2 border-gn-300 text-gn-400 duration-200 ease-in hover:border-gn-400 hover:bg-gn-400/90 hover:opacity-90 disabled:cursor-not-allowed disabled:border-gy-200 disabled:bg-gy-600 disabled:text-white sm:mt-0 md:mb-0 md:ml-3 md:mt-0 md:w-[20rem] md:self-start"
                disabled={!isValid}
              >
                <Plus
                  strokeWidth={3}
                  className="text-primary-main h-6 w-6 duration-200 ease-in group-hover:stroke-white"
                />
                <strong className="text-primary-main ml-4 font-semibold duration-200 ease-in group-hover:text-white">
                  ADICIONAR
                </strong>
              </button>
            </div>
          </div>
        </form>
        {validTicket && (
          <div className="w-full space-y-5 sm:space-y-6 md:flex md:flex-col md:items-center md:space-y-8">
            <div className="h-full w-full max-w-[80rem] rounded bg-white px-4 py-6 text-gy-600 shadow sm:px-6 md:px-8 md:pt-6">
              <p className="text-xl font-bold text-gn-300">Dados do boleto</p>
              <div className="mt-6 border-y border-gy-200 text-sm font-medium text-gy-600 sm:text-base">
                <div className="border-b border-gy-200 p-4">
                  <p className="mb-1 font-semibold">Recebedor:</p>
                  <p>{name || numericLineInfo?.name}</p>
                </div>
                <div className="border-b border-gy-200 p-4">
                  <p className="mb-1 font-semibold">CPF/CNPJ:</p>
                  <p>{document || numericLineInfo?.document}</p>
                </div>

                <div className="border-b border-gy-200 p-4">
                  <p className="mb-1 font-semibold">Vencimento:</p>
                  <p
                    className={cn({
                      'font-semibold text-warn-700':
                        daysOfDelay > 0 || numericLineInfo?.days_of_delay > 0,
                    })}
                  >
                    {dueDate || numericLineInfo?.due_date}
                    {daysOfDelay > 0 ||
                      (numericLineInfo?.days_of_delay > 0 && (
                        <span className="font-semibold text-warn-700">{` - ${
                          daysOfDelay || numericLineInfo?.days_of_delay
                        } dias atrás`}</span>
                      ))}
                  </p>
                </div>

                {numericLineInfo?.value !== undefined && (
                  <Fragment>
                    <div className="border-b border-gy-200 p-4">
                      <p className="mb-1 font-semibold">Valor de Face:</p>
                      <p>{initialValue || numericLineInfo?.value}</p>
                    </div>
                    <div className="border-b border-gy-200 p-4">
                      <p className="mb-1 font-semibold">Acréscimos:</p>
                      <p>+ {feesDiff || numericLineInfo?.fees_diff}</p>
                    </div>
                  </Fragment>
                )}
                <div className="p-4">
                  <p className="mb-1 font-semibold">Valor Total:</p>
                  <p className="font-bold">
                    {ticketValue || numericLineInfo?.amount}
                  </p>
                </div>
              </div>
            </div>
            <div className="h-full w-full max-w-[80rem] rounded bg-white px-4 py-6 text-gy-600 shadow sm:px-6 md:px-8 md:pt-6">
              <p className="text-xl font-bold text-gn-300 md:text-2xl">
                Condição de Pagamento:
              </p>
              <div className="mt-6 border-t border-gy-200 text-sm font-medium text-gy-600">
                <p className="my-6 text-sm font-medium text-gy-600 md:text-base">
                  Selecione a quantidade de parcelas que deseja:
                </p>
                <div className="flex flex-col gap-[10px] pb-5 sm:h-full mdx3:flex-row">
                  <button
                    type="button"
                    className={cn(
                      '',
                      'flex h-16 w-full items-center justify-center rounded border px-2 py-4 pl-2 text-lg',
                      'border-gn-300 bg-white text-gn-400 hover:bg-gy-50',
                    )}
                    onClick={() => setPaymentOption('one')}
                  >
                    {paymentOption === 'one' ? (
                      <CheckIcon className="h-6 w-6" />
                    ) : (
                      <UnCheckIcon className="h-6 w-6" />
                    )}
                    <p className="break-all pl-2 font-semibold mdx3:pl-2">
                      {firstInstallment.quantity}x R${' '}
                      {firstInstallment.installments}
                      <span
                        className={cn(
                          'ml-1 block text-base text-gy-400',
                          'b3:inline sm:text-xl mdx3:block mdx3:text-lg',
                        )}
                      >
                        (Total: {firstInstallment.fullValue})
                      </span>
                    </p>
                  </button>

                  <button
                    type="button"
                    className={cn(
                      '',
                      'flex h-16 w-full items-center justify-center rounded border px-2 py-4 pl-2 text-lg',
                      'border-gn-300 bg-white text-gn-400 hover:bg-gy-50',
                    )}
                    onClick={() => {
                      setPaymentOption('two')
                    }}
                  >
                    {paymentOption === 'two' ? (
                      <CheckIcon className="h-6 w-6" />
                    ) : (
                      <UnCheckIcon className="h-6 w-6" />
                    )}
                    <p className="break-all pl-2 font-semibold">
                      {secondInstallment.quantity}x R${' '}
                      {secondInstallment.installments}
                      <span
                        className={cn(
                          'ml-1 block text-base text-gy-400',
                          'b3:inline sm:text-xl mdx3:block mdx3:text-lg',
                        )}
                      >
                        (Total: {secondInstallment.fullValue})
                      </span>
                    </p>
                  </button>

                  <button
                    type="button"
                    className={cn(
                      '',
                      'flex h-16 w-full  items-center justify-center rounded border px-2 py-4 pl-2 text-lg',
                      'border-gn-300 bg-white text-gn-400 hover:bg-gy-50',
                    )}
                    onClick={() => {
                      setPaymentOption('three')
                    }}
                  >
                    {paymentOption === 'three' ? (
                      <CheckIcon className="h-6 w-6" />
                    ) : (
                      <UnCheckIcon className="h-6 w-6" />
                    )}
                    <p className="break-normal pl-2 font-semibold mdx3:pl-2">
                      {thirdInstallment.quantity}x R${' '}
                      {thirdInstallment.installments}
                      <span
                        className={cn(
                          'ml-1 block text-base text-gy-400',
                          'b3:inline sm:text-xl mdx3:block mdx3:text-lg',
                        )}
                      >
                        (Total: {thirdInstallment.fullValue})
                      </span>
                    </p>
                  </button>
                </div>
              </div>
              <Button
                icon={Divide}
                text="Confirmar parcelas"
                action={saveAndNavigate}
              />
            </div>
          </div>
        )}
      </main>
      <PasteNumericLineModal
        trigger={trigger}
        handlePaste={setValue}
        openConfirmModal={openConfirmModal}
        setOpenConfirmModal={setOpenConfirmModal}
      />
    </div>
  )
}
