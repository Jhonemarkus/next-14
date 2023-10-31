import localStorageFetcher from "@/swr/localStorageFetcher"
import useSWR from "swr"

const key = '/prt/todo'

export default function useTODOList () {
  const {error, isLoading, mutate, data} = useSWR(key, localStorageFetcher)
  const update = (list) => {
    window.localStorage.setItem(key, JSON.stringify(list))
    mutate(list, {revalidate: false})
  }
  return {
    error,
    isLoading,
    data: data ?? [],
    update,
  }
}
