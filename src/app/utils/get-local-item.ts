export const getLocalItem = (key: string) => {
  const localData = localStorage.getItem(key)
  if (localData !== null) {
    return JSON.parse(localData)
  }
  throw new Error('Item not found.')
}
