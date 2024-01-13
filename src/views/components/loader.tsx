import { ReactPortal } from '@views/components/react-portal'
import { ZixPaySpinner } from '@views/components/zixpay-spinner'

interface Props {
  isLoading: boolean
}

export const Loader = ({ isLoading }: Props) => {
  if (!isLoading) {
    return null
  }

  let container = document.getElementById('loader-root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'loader-root')
    document.body.appendChild(container)
  }

  return (
    <ReactPortal containerId="loader-root">
      <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-rgba-custom-gray">
        <ZixPaySpinner />
      </div>
    </ReactPortal>
  )
}
