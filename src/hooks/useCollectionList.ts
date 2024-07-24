import { useReducer } from "react"
import { reducerCollectionList } from "./reducers/reducerCollectionList"

export default  function useCollectionList () {
  const [state, dispatch] = useReducer(reducerCollectionList, {
    collectionList: []
  })
  
  return {
    state,
    dispatch
  }
}
