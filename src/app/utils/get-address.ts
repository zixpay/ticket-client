import { RealEstateData } from '@views/contracts/real-estate'

export const getAddress = (data: RealEstateData) => {
  const {
    complement,
    street,
    number,
    neighborhood,
    city,
    state,
    zip_code: zipCode,
  } = data

  const address = `Rua ${street}, nº ${number} - ${neighborhood} - ${city}/${state} - ${
    zipCode.slice(0, 2) + '.' + zipCode.slice(2, 5) + '-' + zipCode.slice(5)
  } ${complement === 'Não informado' ? '' : `- ${complement}`}`
  return address
}
