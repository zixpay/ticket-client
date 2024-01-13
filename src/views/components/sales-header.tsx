import logoName from '@/assets/images/logo-name.svg'
import { normalizeName } from '@app/utils/format/name'
import { cn } from '@app/utils/cn'

interface Props {
  fantasyName: string
}

export const SalesHeader = ({ fantasyName }: Props) => (
  <header className="flex h-16 w-full items-center justify-between border-b border-white bg-gy-150 shadow">
    <img src={logoName} alt="Zixpay" className="w-[112px] b3:ml-2" />
    <p
      className={cn(
        'mr-4 block text-xs text-gy-600 b1:inline',
        'b3:flex b3:w-full b3:justify-end b3:text-base',
      )}
    >
      <span className="block text-right b1:inline">Venda realizada por:</span>
      <strong className="mx-1 text-gn-400">{normalizeName(fantasyName)}</strong>
    </p>
  </header>
)
