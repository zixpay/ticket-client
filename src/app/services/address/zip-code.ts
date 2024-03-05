import { httpClient } from '@app/services/http-client'

interface ZipCodeParams {
  userAddress: string
}

export async function zipCode({ userAddress }: ZipCodeParams) {
  const { data } = await httpClient.post('/users/search-zip-code-by-address', {
    address: userAddress,
  })

  return data
}
