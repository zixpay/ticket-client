import { useState, useEffect } from 'react'

interface Props {
  secondsToReturn: number
}

export const Timer = ({ secondsToReturn }: Props) => {
  const [seconds, setSeconds] = useState(secondsToReturn)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        const newSeconds = prevSeconds - 1
        if (newSeconds <= 0) {
          clearInterval(interval)
          localStorage.clear()
          window.location.href = 'https://zixpay.com.br/'
        }
        return newSeconds
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div>
      <p className="mt-4 font-semibold text-gy-500">
        Em {seconds} segundos você voltara para o site Zixpay.
      </p>
    </div>
  )
}
