export const normalizeAddress = (address: string) => {
  if (!address) return ''
  return address
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('+')
}
