export default async function localStorageFetcher(key: string) {
  if (!window || !window.localStorage) {
    return null
  }
  const data = JSON.parse(window.localStorage.getItem(key) ?? 'null')
  return data
}
