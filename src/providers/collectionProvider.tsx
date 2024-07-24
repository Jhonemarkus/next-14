'use client'

import { createContext } from "react"

export const CollectionContext = createContext(null)

export default function CollectionProvider ({ children }) {

  return (
    <CollectionContext.Provider value="my value">
      {children}
    </CollectionContext.Provider>
  )
}