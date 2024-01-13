import { type FunctionComponent, type ReactNode } from 'react'
import ReactDOM from 'react-dom'

interface Props {
  children: ReactNode
  containerId: string
}

export const ReactPortal: FunctionComponent<Props> = ({
  children,
  containerId = 'portal-root',
}: Props) => {
  let container = document.getElementById(containerId)
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', containerId)
    document.body.appendChild(container)
  }

  return ReactDOM.createPortal(children, container)
}
