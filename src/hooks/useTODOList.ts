import { IUseTODOList } from "@/app/prt/types/hooks/iUseTODOList"
import { ITodo } from "@/app/prt/types/iTodo"
import localStorageFetcher from "@/swr/localStorageFetcher"
import useSWR from "swr"

const key = '/prt/todo'

export default function useTODOList (): IUseTODOList {
  const {error, isLoading, mutate, data} = useSWR(key, localStorageFetcher)
  const update = (list: ITodo[]) => {
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
