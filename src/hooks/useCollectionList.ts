import { useCallback, useReducer } from "react"
import { reducerCollectionList } from "./reducers/reducerCollectionList"
import { Collection } from "@/types/Collection"
import { CollectionListState } from "@/types/hooks/CollectionListState"

export default  function useCollectionList (): IUseTODOList {
  const [state, dispatch] = useReducer(reducerCollectionList, {
    collectionList: []
  })

  const createCollection = useCallback((collection: Collection) => {
    console.info("on mount")
  }, [])
  
  return {
    state,
    dispatch
  }
}
