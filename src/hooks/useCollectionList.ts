import { useReducer } from "react"
import { reducerCollectionList } from "./reducers/reducerCollectionList"
import { LocalStorageKeys } from "@/types/LocalStorageKeys"

export default  function useCollectionList () {
  const [state, dispatch] = useReducer(
    reducerCollectionList,
    { collectionList: [] },
    (initialArg) => {
      if (window?.localStorage) {
        try {
          const collectionlist = JSON.parse(window.localStorage.getItem(LocalStorageKeys.LS_KEY))
          if (collectionlist != null) {
            return {
              collectionlist
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
