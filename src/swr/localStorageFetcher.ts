export default async function localStorageFetcher(key: string) {
  if (!window || !window.localStorage) {
    return null
  }
  const data = JSON.parse(window.localStorage.getItem(key) ?? 'null')
  console.debug('Local Storage data:', data)
  return data
}
