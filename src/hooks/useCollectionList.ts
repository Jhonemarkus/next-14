'use client'

import { useReducer } from "react"
import { reducerCollectionList } from "./reducers/reducerCollectionList"
import { LocalStorageKeys } from "@/types/LocalStorageKeys"

const isBrowser = () => typeof window !== 'undefined';

export default  function useCollectionList () {
  const [state, dispatch] = useReducer(
    reducerCollectionList,
    { collectionList: [] },
    (initialArg) => {
      if (isBrowser()) {
        try {
          const collectionList = JSON.parse(window.localStorage.getItem(LocalStorageKeys.LS_KEY))
          if (collectionList != null) {
            return {
              collectionList
            }
          }
        } catch (error) {
          console.error("Couldn't load the list of collections from local storage", {error})
        }
      }
      return initialArg
    }
  )
  
  return {
    state,
    dispatch
  }
}
