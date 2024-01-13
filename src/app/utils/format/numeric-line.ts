export const normalizeNumericLine = (numericLine: string) => {
  if (!numericLine) return ''

  const result = numericLine.replace(/\s/g, '')
  return result.replace(/[^\w\s]/gi, '')
}
