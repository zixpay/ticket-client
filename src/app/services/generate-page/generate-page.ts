import { httpClient } from '@app/services/http-client'

interface GeneratePageParams {
  establishment: string
  token: string
}

interface GeneratePageResponse {
  page_url: string
}

export async function generatePage(body: GeneratePageParams) {
  const { data } = await httpClient.post<GeneratePageResponse>(
    '/establishments',
    body,
  )

  return data
}
