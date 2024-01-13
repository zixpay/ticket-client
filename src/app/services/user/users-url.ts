import { httpClient } from '@app/services/http-client'

type UsersUrlParams =
  | {
      document: string
    }
  | {
      recipientDocument: string
    }

export type SearchResponse =
  | {
      type: 'user'
      data: {
        id: string
        document: string
        email: string
        name: string
        phone: string
        birthdate: string
        zip_code: string
        state: string
        city: string
        neighborhood: string
        street: string
        number: string
        complement: string
        created_at: Date
      }
    }
  | {
      type: 'recipient'
      data: {
        recipient_document: string
        recipient_email: string
        recipient_name: string
        recipient_phone: string
        recipient_birthdate: string
      }
    }

export async function userUrl(body: UsersUrlParams) {
  const { data } = await httpClient.post<SearchResponse>('/users/show', body)

  return data
}
