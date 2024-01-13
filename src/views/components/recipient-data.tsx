import { Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'

import { normalizeCpf } from '@app/utils/format/cpf'
import { normalizeName } from '@app/utils/format/name'
import { getLocalItem } from '@app/utils/get-local-item'

export const RecipientData = () => {
  const { street, number, document, name, neighborhood, city } =
    getLocalItem('@zixpay-checkout')

  const address = `Rua ${street}, nº ${number} - Bairro ${neighborhood} - ${city}`
  return (
    <div className="mx-5 mb-6 mt-4 rounded bg-white px-3 py-4 text-gy-600 sm:mx-10 sm:mb-12 sm:px-6 md:mx-0 md:mb-6 md:mt-0 md:px-10">
      <div className="flex justify-center align-top ">
        <div className="mb-2 flex w-full flex-col items-start">
          <strong className="sm:text-2xl">Dados do Beneficiário</strong>
          <p className="mt-2 flex flex-wrap break-words text-xs sm:text-base">
            O beneficiário de imobiliária recebe vantagens financeiras em
            transações de propriedades imóveis.
          </p>
        </div>
        <Link to="/checkout">
          <div className="h-6 w-6">
            <Pencil
              fill="green"
              size={12}
              className="mb-6 ml-2 mr-6 h-5 w-5 text-gn-400"
            />
          </div>
        </Link>
      </div>
      <div className="text-sm text-gy-600 sm:text-base">
        <div className="sm:flex sm:w-full sm:items-end sm:justify-between">
          <p className="mb-4 sm:my-2">
            Nome:
            <strong className="ml-2 font-semibold">
              {normalizeName(name)}
            </strong>
          </p>
          <p className="mb-4 sm:my-2">
            CPF:
            <strong className="ml-2 font-semibold">
              {normalizeCpf(document)}
            </strong>
          </p>
        </div>
        <p>
          Endereço:
          <strong className="ml-2 font-semibold">{address}</strong>
        </p>
      </div>
    </div>
  )
}
