import { Undo2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import errorIcon from '@/assets/images/icons/error.svg'

import { Button } from '@views/components/button'
import { ReactPortal } from '@views/components/react-portal'
import { Timer } from '@views/pages/feedback/components/timer'
import { useFeedback } from '@views/pages/feedback/use-feedback'

interface Props {
  isError: boolean
}

export const ErrorPage = ({ isError }: Props) => {
  const { id } = useFeedback()

  if (!isError) {
    return null
  }

  let container = document.getElementById('portal-root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'portal-root')
    document.body.appendChild(container)
  }

  return (
    <ReactPortal containerId="loader-root">
      <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-rgba-custom-gray">
        <div className="flex h-full flex-col items-center justify-center space-y-8 px-6 py-10 sm:px-10 md:px-32">
          <img src={errorIcon} alt="Success" className="h-16 w-16" />
          <h1 className="mt-8 text-center text-2xl font-bold text-warn-700">
            Não foi possível acessar a página atual.
          </h1>

          <div className="items-center smx2:flex smx2:gap-8 md:gap-10">
            <Link to={`/${id}`}>
              <Button text="Voltar para a página inicial" icon={Undo2} />
            </Link>
            <Timer secondsToReturn={10} />
          </div>
        </div>
      </div>
    </ReactPortal>
  )
}
