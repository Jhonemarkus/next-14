import { IUseTODOList } from "@/types/hooks/iUseTODOList"
import { ITodo } from "@/types/iTodo"
import { ITodoGroup } from "@/types/iTodoGroup"
import { StoredDataV1 } from "@/types/storedDataV1"
import localStorageFetcher from "@/swr/localStorageFetcher"
import versionChecker from "@/swr/versionChecker"
import { useCallback } from "react"
import useSWR from "swr"
import { trace } from "@opentelemetry/api"

const key = '/prt/todo'

export default  function useTODOList (): IUseTODOList {
  const tracer = trace.getTracer("PRT")
  const {error, isLoading, mutate, data} = useSWR<StoredDataV1>(
    key,
    async (key: string) => {
      return tracer.startActiveSpan("useTODOList.loadData", async (span) => {
        try {
          return versionChecker(await localStorageFetcher(key))
        } finally {
          span.end()
        }
      })
    }
  )
  
  const update = useCallback((newData: StoredDataV1) => {
    window.localStorage.setItem(key, JSON.stringify(newData))
    // mutate(newData, {revalidate: false})
    mutate(newData)
  }, [mutate])

  const groupList = useCallback((newData?: StoredDataV1) => {
    if (newData == null) {
      return []
    }
    const list: ITodoGroup[] =  Object.values(newData.groups).sort((a, b) => a.sequence - b.sequence)
    return list
  }, [])
  
  return {
    error,
    isLoading,
    data,
    update,
    groupList,
  }
}
