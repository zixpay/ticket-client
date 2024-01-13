export interface SubmitDataToSell {
  // Payment
  card_number: string
  card_owner: string
  cvc: string
  expiry: string

  // Checkout
  document: string
  name: string
  birthdate: string
  email: string
  phone: string
  zip_code: string
  state: string
  city: string
  street: string
  number: string
  complement: string

  // Home
  user_ip_address: string
  full_value: string
  quantity: number
  sell_token: string
}

export type FeedbackResponse = 'webhook-success' | 'webhook-error'
