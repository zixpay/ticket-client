import { httpClient } from '@app/services/http-client'

interface GeneratePageParams {
  establishment: string
  token: string
  fineValue: number
  dailyArrears: number
}

interface GeneratePageResponse {
  page_url: string
}

export async function generatePage(body: GeneratePageParams) {
  const { data } = await httpClient.post<GeneratePageResponse>(
    '/establishments',
    { ...body, fine_value: body.fineValue, daily_arrears: body.dailyArrears },
  )

  return data
}
