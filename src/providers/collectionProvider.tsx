'use client'

import useCollectionList from "@/hooks/useCollectionList"
import { createContext } from "react"

export const CollectionContext = createContext(null)

export default function CollectionProvider ({ children }) {
  const useCollectionListValue = useCollectionList()
  return (
    <CollectionContext.Provider value={{useCollectionList: useCollectionListValue}}>
      {children}
    </CollectionContext.Provider>
  )
}