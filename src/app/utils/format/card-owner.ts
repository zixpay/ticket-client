export const normalizeCardOwner = (name: string): string => {
  if (!name) return ''

  const names: string[] = name.split(' ')

  for (let i = 1; i < names.length - 1; i++) {
    names[i] = names[i].charAt(0).toUpperCase() + '.'
  }

  names[0] = names[0].toUpperCase()
  names[names.length - 1] = names[names.length - 1].toUpperCase()

  return names.join(' ')
}
