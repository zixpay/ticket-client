/* eslint-disable @typescript-eslint/no-unused-vars */
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

import { Routes } from '@/routes'
import { SellProvider } from '@app/contexts/sell-context'

import '@/assets/styles/globals.css'
import { useEffect } from 'react'

export const App = () => {
  useEffect(() => {
    const handleBeforeUnload = (_e: unknown) => {
      localStorage.clear()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return (
    <SellProvider>
      <BrowserRouter>
        <Toaster />
        <Routes />
      </BrowserRouter>
    </SellProvider>
  )
}
