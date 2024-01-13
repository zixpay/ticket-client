import { ZixCircleIcon } from '@/assets/icons/zix-circle'

import { normalizeName } from '@app/utils/format/name'
import { normalizeCnpj } from '@app/utils/format/cnpj'

interface Props {
  logoUrl: string
  fantasyName: string
  document: string
  address: string | null
}

export const RealEstateData = ({
  logoUrl,
  fantasyName,
  document,
  address,
}: Props) => (
  <footer className="flex flex-col items-center justify-center px-5 pb-14 sm:px-10">
    <div className="my-5 h-auto w-full rounded bg-white p-6 shadow sm:mx-20 sm:px-6 sm:py-6 md:px-10 mdx3:mx-10 mdx3:my-8 mdx3:h-auto mdx3:max-w-[26.25rem]">
      <strong className="text-lg text-gy-600 sm:text-2xl">
        Dados da empresa:
      </strong>
      {logoUrl ? (
        <img
          src={logoUrl}
          alt="Zix circle"
          className="my-3 rounded border-none object-fill sm:my-4"
        />
      ) : (
        <ZixCircleIcon className="my-3 h-24 w-24 rounded border-none text-gn-300 sm:my-4" />
      )}
      <div className="text-sm text-gy-600 sm:max-w-[21.25rem] sm:text-base">
        <p className="mb-4">
          Nome:
          <strong className="ml-2 font-semibold">
            {normalizeName(fantasyName)}
          </strong>
        </p>
        <p className="mb-4">
          CNPJ:
          <strong className="ml-2 font-semibold">
            {normalizeCnpj(document)}
          </strong>
        </p>
        {address && (
          <p>
            Endereço:
            <strong className="ml-2 font-semibold">{address}</strong>
          </p>
        )}
      </div>
    </div>
  </footer>
)
