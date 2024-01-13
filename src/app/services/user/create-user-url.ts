import { httpClient } from '@app/services/http-client'

interface CreateUsersUrlParams {
  document: string
  name: string
  birthdate: string
  email: string
  phone: string
  recipient_document?: string
  recipient_name?: string
  recipient_email?: string
  recipient_phone?: string
  recipient_birthdate?: string
  zip_code: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
  complement?: string
}

interface CreatedUser {
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
  created_at: string
}

export async function createUserUrl(body: CreateUsersUrlParams) {
  const { data } = await httpClient.post<CreatedUser>('/users', body)

  return data
}
