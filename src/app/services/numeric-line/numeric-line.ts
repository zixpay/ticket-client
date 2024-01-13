import { httpClient } from '@app/services/http-client'

interface NumericLineParams {
  numeric_line: string
  page_url: string
}

interface NumericLineResponse {
  document: string
  name: string
  value: string
  due_date: string
  fees: string
  fees_diff: string
  days_of_delay: number
  amount: string
  installments: {
    initial_value: string
    full_value: string
    quantity: number
    diff: string
    installments: string
  }[]
}

export async function numericLine(body: NumericLineParams) {
  const { data } = await httpClient.post<NumericLineResponse>(
    '/users/numeric-line',
    body,
  )

  return data
}
