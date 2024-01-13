export const normalizeCpf = (cpf: string) => {
  cpf.replace(/\D/g, '')
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
}
