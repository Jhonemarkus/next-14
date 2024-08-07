'use client'

import PrimaryButton from "@/components/primaryButton"
import { CollectionContext } from "@/providers/collectionProvider"
import { Collection } from "@/types/Collection"
import { CollectionListActionType } from "@/types/hooks/CollectionListAction2"
import { useRouter } from "next/navigation"
import { useCallback, useContext, useState } from "react"

export default function NewCollection() {
  const { useCollectionList: {state: { collectionList }, dispatch } } = useContext(CollectionContext)
  const [error, setError] = useState<string|null>(null)
  const router = useRouter()
  
  const createCollection = (data: FormData) => {
    if (data == null || data.get('name') == null) {
      setError('Name is required')
      return
    }
    const slug = (data.get('name') as string).replace(/\W+/g, '-').toLowerCase()
    const existingCol = collectionList.find((col: Collection) => col.slug === slug)
    if (existingCol) {
      setError(`A collection with a similar name already exists "${existingCol.name}"`)
      return
    }
    dispatch({
      type: CollectionListActionType.NEW,
      newCollection: {
        name: data.get('name') as string,
        slug,
        categories: [{
          name: 'Main',
          itemList: []
        }]
      }
    })
    router.push('/collections')
  }
  
  return (
    <div>
      <h2>New Collection</h2>
      <form className="flex flex-col mt-4" action={createCollection}>
        <div className="flex flex-row">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" className="ml-2" required autoFocus />
        </div>
        <div className="mt-2">
          <PrimaryButton type="submit">
            Create
          </PrimaryButton>
        </div>
        {error && (
        <div className="mt-2">
          {error}
        </div>
        )}
      </form>
    </div>
  )
}

export type NewCollectionForm = {
  name: string,
  success?: boolean,
  error?: string
}
