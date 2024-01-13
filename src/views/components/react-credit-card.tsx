import Card from 'react-credit-cards-2'

type FocusedProps = 'name' | 'number' | 'expiry' | 'cvc' | ''

export interface ReactCreditCardProps {
  cvc: string | number
  expiry: string
  focused?: FocusedProps | undefined
  name: string
  number: string | number
}

export const ReactCreditCard = ({
  cvc,
  name,
  number,
  expiry,
  focused,
}: ReactCreditCardProps) => {
  if (expiry.includes('null')) {
    expiry = expiry.replace('null', '12')
  }
  if (expiry.includes('undefined')) {
    expiry = expiry.replace('undefined', '09')
  }

  return (
    <div className="mb-8 flex w-full">
      <Card
        cvc={cvc}
        name={name}
        number={number}
        expiry={expiry}
        focused={focused}
      />
    </div>
  )
}
