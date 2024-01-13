export const normalizeName = (name: string) => {
  if (!name) return ''
  name = name.trim().replace(/\s+/g, ' ')
  const nameParts = name.split(' ')
  return nameParts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
