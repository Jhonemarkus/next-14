'use client'

import useCollectionList from "@/hooks/useCollectionList"
import { Collection } from "@/types/Collection"
import { CollectionListActionType } from "@/types/hooks/CollectionlistAction"
import { useCallback, useState } from "react"

export default function NewCollection() {
  const { state: { collectionList }, dispatch } = useCollectionList()
  const [error, setError] = useState<string|null>(null)
  const createCollection = (data: FormData) =>{
    console.log('calling dispatch', data)
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
    console.log('Saved')
  }
  
  // console.log("NewCollectionRender", { state })
  return (
    <div>
      <h2>New Collection</h2>
      <form className="flex flex-col mt-4" action={createCollection}>
        <div className="flex flex-row">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" className="ml-2" required autoFocus />
        </div>
        <div className="mt-2">
          <button disabled={false} type="submit">Create</button>
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