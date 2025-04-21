'use client'

import { useEffect, useReducer } from "react"
import { reducerCollectionList } from "./reducers/reducerCollectionList"
import { LocalStorageKeys } from "@/types/LocalStorageKeys"
import { CollectionListState } from "@/types/hooks/CollectionListState";

const isBrowser = () => typeof window !== 'undefined';

export type UseCollectionListReturn = {
  state: CollectionListState,
  dispatch: Function
}

export default  function useCollectionList (): UseCollectionListReturn {
  const [state, dispatch] = useReducer(
    reducerCollectionList,
    { collectionList: [] }
  )

  useEffect(() => {
    
  }, [])
  
  return {
    state,
    dispatch
  }
}
