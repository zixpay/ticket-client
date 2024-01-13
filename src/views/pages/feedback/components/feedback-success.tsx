import { Undo2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import successIcon from '@/assets/images/icons/success.svg'
import { normalizeCnpj } from '@app/utils/format/cnpj'
import { formatedDate, formatedHours } from '@app/utils/get-date'

import { Button } from '@views/components/button'
import { Timer } from './timer'

interface Props {
  realEstate: string
  fullValue: string
  quantity: number
  installments: string
  document: string
  card: string
  id: string
}

export const FeedbackSuccess = ({
  document,
  fullValue,
  installments,
  quantity,
  realEstate,
  card,
  id,
}: Props) => {
  return (
    <div className="flex flex-col items-center px-6 py-10 sm:px-10 md:px-32">
      <img src={successIcon} alt="Success" className="h-16 w-16" />
      <h1 className="mt-8 text-center text-2xl font-bold text-gn-400">
        Pronto, seu pagamento foi aprovado!
      </h1>
      <div className="mb-2 mt-6 w-full rounded bg-white px-4 py-6 shadow">
        <p className="text-lg font-bold text-gy-600">Você pagou:</p>
        <p className="mt-3 text-4xl font-semibold text-gn-400">
          R$ {fullValue}
        </p>
        <p className="my-4 text-gy-400">
          Crédito Parcelado em:
          <span className="mx-1 text-2xl font-medium text-gn-400">
            {quantity}x
          </span>
          de
          <span className="mx-1 text-2xl font-semibold text-gn-400">
            R$ {installments}
          </span>
        </p>
        <p className="text-gy-600">Cartão utilizado:</p>
        <p className="font-semibold text-gy-600">
          **** **** **** {card.slice(1, -1)}
        </p>
        <p className="mt-4 text-gy-600">Data da transação:</p>
        <p className="font-semibold text-gy-600">
          {formatedDate} <span className="font-normal">às</span> {formatedHours}
        </p>
        <p className="mt-4 text-lg font-bold text-gy-600">
          {realEstate} - {normalizeCnpj(document)}
        </p>
        <p className="mt-4 text-xs text-gy-600">
          Na fatura do seu cartão você verá o pagamento em nome de {realEstate}
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
