import { httpClient } from '@app/services/http-client'

interface RealEstateUrlParams {
  id: string
}

export interface RealEstateUrlResponse {
  id: string
  pageUrl: string
  name: string
  fantasyName: string
  document: string
  email: string
  logoUrl: string
  sellerId: string
  phone: string
  token: string
  adresses: Array<{
    id: string
    userId: string
    realEstateId: string
    zipCode: string
    state: string
    city: string
    neighborhood: string
    street: string
    number: string
    complement: string
  }>
}

export async function establishmentUrl({ id }: RealEstateUrlParams) {
  const { data } = await httpClient.get<RealEstateUrlResponse>(
    '/establishments/' + id,
  )

  return data
}
