import { useRef } from 'react'

export const useFeedback = () => {
  const pageUrlRef = useRef(localStorage.getItem('@zixpay-page-url'))
  const id = pageUrlRef.current
  if (!id) {
    throw new Error('Invalid page.')
  }

  return {
    id,
  }
}
