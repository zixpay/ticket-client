/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clipboard, X } from 'lucide-react'

import { toast } from 'react-hot-toast'

import { Modal } from '@views/components/modal'
import { UseFormSetValue } from 'react-hook-form'

interface Props {
  trigger: any
  handlePaste: UseFormSetValue<{ numericLine: string }>
  openConfirmModal: boolean
  setOpenConfirmModal: (value: boolean) => void
}

export function PasteNumericLineModal({
  trigger,
  handlePaste,
  openConfirmModal,
  setOpenConfirmModal,
}: Props) {
  const handlePasteText = async () => {
    try {
      const clipBoardText = await navigator.clipboard.readText()
      toast.success('Linha digitável colada com sucesso!', {
        style: {
          border: '1px solid #22c55e',
          padding: '8px',
          width: 'auto',
          backgroundColor: '#F0fdf5',
        },
      })
      return clipBoardText
    } catch (error) {
      console.error('Erro ao ler a área de transferência:', error)
      toast.error('Erro ao ler a área de transferência.', {
        style: {
          border: '1px solid #ef4444',
          padding: '8px',
          width: 'auto',
          backgroundColor: '#FEF2F2',
        },
      })
      return ''
    }
  }

  return (
    <Modal open={openConfirmModal} setOpen={setOpenConfirmModal}>
      <>
        <div className="disabled:cursor-not-allowed sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
            <Clipboard className="h-6 w-6 text-green-600" />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="flex justify-between text-base font-semibold leading-6 text-gray-900">
              Colar linha digitável?
              <X
                className="cursor-pointer text-red-600"
                strokeWidth={3}
                onClick={() => setOpenConfirmModal(false)}
              />
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Verificamos que você copiou uma linha digitável, deseja colar?
              </p>
            </div>
          </div>
        </div>
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-gn-300 px-5 py-2 text-sm font-bold text-white shadow-sm outline-none hover:bg-opacity-80 hover:opacity-90 disabled:pointer-events-none disabled:cursor-not-allowed sm:ml-3 sm:w-auto"
            onClick={async () => {
              const clipboardText = await handlePasteText()
              handlePaste('numericLine', clipboardText.replace(/[. ]/g, ''))
              setOpenConfirmModal(false)
              trigger()
            }}
          >
            Sim, Colar
          </button>
        </div>
      </>
    </Modal>
  )
}
