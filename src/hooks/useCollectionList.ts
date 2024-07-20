import { useCallback, useReducer } from "react"
import { reducerCollectionList } from "./reducers/reducerCollectionList"
import { Collection } from "@/types/Collection"
import { CollectionListState } from "@/types/hooks/CollectionListState"

export default  function useCollectionList (): IUseTODOList {
  const [state, dispatch] = useReducer<any, CollectionListState>(reducerCollectionList, {
    collectionList: []
  })

  const createCollection = useCallback((collection: Collection) => {
    if ()
  }, [])
  
  return {
    state
  }
}
