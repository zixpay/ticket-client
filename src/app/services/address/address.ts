import { httpClient } from '@app/services/http-client'

interface AddressParams {
  zipCode: string
}

interface AddressResponse {
  zip_code: string
  city: string
  neighborhood: string
  state: string
  street: string
}

export async function address({ zipCode }: AddressParams) {
  const { data } = await httpClient.get<AddressResponse>(
    '/users/search-address-by-zip-code/' + zipCode,
  )

  return data
}
