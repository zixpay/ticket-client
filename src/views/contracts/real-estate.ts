import { type UseQueryResult } from '@tanstack/react-query'

export interface AddressProps {
  id: string
  user_id: string
  establishment_id: string
  zip_code: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
  complement: string
}

export interface RealEstateData {
  id: string
  page_url: string
  name: string
  fantasy_name: string
  document: string
  email: string
  logo_url: string
  seller_id: string
  phone: string
  token: string
  zip_code: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
  complement: string
}

export type RealEstateQuery = UseQueryResult<RealEstateData, Error>
