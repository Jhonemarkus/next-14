'use client'

import Link from "next/link";
import useCollectionList from '@/hooks/useCollectionList'
import { useContext } from 'react'
import { CollectionContext } from "@/providers/collectionProvider";
import { Collection } from "@/types/Collection";

export default function CollectionList () {
  const {useCollectionList: {state: {collectionList}}} = useContext(CollectionContext)
  
  return (
    <div>
      <h2>All Collections</h2>
      <div>
        {collectionList.map((coll) => (<CollectionItem key={`collection-${coll.slug}`} collection={coll} />))}
      </div>
    </div>
  )
}

function CollectionItem ({collection }: {collection: Collection}) {
  if (!collection) {
    return null
  }
  const itemCount = collection.categories.reduce((count, category) => {
    count += category?.itemList?.length ?? 0
    return count
  }, 0)
  return (
    <Link href={`/collections/${collection.slug}`}>
      <div className="flex flex-direction-row justify-around border-2 border-black mb-2">
        <div>
          {collection.name}
        </div>  
        <div>
          Categories: {collection.categories.length}
        </div>
        <div>
          Items: {itemCount}
        </div>
      </div>
    </Link>
  )
}