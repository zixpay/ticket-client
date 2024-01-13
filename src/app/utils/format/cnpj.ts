export const normalizeCnpj = (cnpj: string) => {
  if (!cnpj) return ''
  const resetCnpj = cnpj.toString().replace(/\D/g, '')
  return resetCnpj.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5',
  )
}
