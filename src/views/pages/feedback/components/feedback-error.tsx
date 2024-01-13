import { Undo2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import errorIcon from '@/assets/images/icons/error.svg'

import { Button } from '@views/components/button'
import { Timer } from './timer'

interface Props {
  id: string
}

export function FeedbackError({ id }: Props): JSX.Element {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-8 px-6 py-10 sm:px-10 md:px-32">
      <img src={errorIcon} alt="Success" className="h-16 w-16" />
      <h1 className="mt-8 text-center text-2xl font-bold text-warn-700">
        Não foi possível processar o seu pagamento.
      </h1>
      <div className="mb-2 mt-6 w-full rounded bg-white px-4 py-6 shadow">
        <p className="text-lg font-bold text-gy-600">
          Verificamos que a transação referente ao pagamento não foi autorizada
          pela sua operadora responsável.
        </p>
        <p className="mt-4 font-medium text-gy-600">
          Por favor, tente novamente mais tarde ou com um outro cartão válido.
        </p>
      </div>
      <div className="items-center smx2:flex smx2:gap-8 md:gap-10">
        <Link to={`/${id}`}>
          <Button text="Voltar para o site" icon={Undo2} />
        </Link>
        <Timer secondsToReturn={30} />
      </div>
    </div>
  )
}
