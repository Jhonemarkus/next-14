'use client'

import useCollectionList from "@/hooks/useCollectionList"
import { CollectionContextValue } from "@/types/props/CollectionContextValue"
import { createContext } from "react"

export const CollectionContext = createContext<CollectionContextValue>({
  useCollectionList: {
    state: {
      collectionList: []
    },
    dispatch: () => {}
  }
})

export default function CollectionProvider ({ children }: { children: React.ReactNode }) {
  const useCollectionListValue = useCollectionList()
  return (
    <CollectionContext.Provider value={{useCollectionList: useCollectionListValue}}>
      {children}
    </CollectionContext.Provider>
  )
}