export const normalizeCardNumber = (cardNumber: string) => {
  if (!cardNumber) return ''

  cardNumber = cardNumber.replace(/\D/g, '')
  cardNumber = cardNumber.replace(/^(\d{4})(\d)/g, '$1 $2')
  cardNumber = cardNumber.replace(/^(\d{4})\s(\d{4})(\d)/g, '$1 $2 $3')
  return cardNumber.replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/g, '$1 $2 $3 $4')
}
