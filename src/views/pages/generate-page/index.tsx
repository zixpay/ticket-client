import { Fragment } from 'react'
import { Plus } from 'lucide-react'

import hero from '@/assets/images/logo-name.svg'

import { Button } from '@views/components/gp-button'
import { Input } from '@views/components/gp-input'

import { useGeneratePageController } from '@views/pages/generate-page/use-generate-page-controller'

export const GeneratePage = () => {
  const { errors, pageUrl, register, handleSubmit } =
    useGeneratePageController()

  return (
    <Fragment>
      <div className="mt-3 flex flex-col items-center p-20">
        <img src={hero} alt="Logo name" className="h-20" />
      </div>

      {pageUrl && (
        <p className="mx-auto mb-6 max-w-[90%] break-words text-center font-semibold text-gn-400">
          {pageUrl}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="mx-auto flex h-14 w-[90%] max-w-lg flex-col gap-4 lg:mx-auto lg:flex lg:max-w-xl"
      >
        <Input
          placeholder="Estabelecimento *"
          error={errors.establishment?.message as string}
          {...register('establishment')}
        />

        <Input
          maxLength={40}
          placeholder="Token *"
          error={errors.token?.message as string}
          {...register('token')}
        />

        <Input
          maxLength={40}
          placeholder="Multa (opcional) Ex. 0.1"
          error={errors.fineValue?.message as string}
          {...register('fineValue')}
        />

        <Input
          maxLength={40}
          placeholder="Mora diária (opcional) Ex. 0.01"
          error={errors.dailyArrears?.message as string}
          {...register('dailyArrears')}
        />

        <div className="flex h-auto w-full justify-center pb-20">
          <Button
            type="submit"
            className="flex h-12 w-3/5 items-center justify-center gap-2 sm:w-1/2"
          >
            <Plus strokeWidth={3} className="h-6 w-6" />
            <strong className="">Criar página!</strong>
          </Button>
        </div>
      </form>
    </Fragment>
  )
}
