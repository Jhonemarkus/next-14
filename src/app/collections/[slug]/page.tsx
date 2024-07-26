'use client'

import AddCollectionCategory from "@/components/addCollectionCategory"
import Input from "@/components/input"
import PrimaryButton from "@/components/primaryButton"
import SecondaryButton from "@/components/secondaryButton"
import Toggle from "@/components/toggle"
import { CollectionContext } from "@/providers/collectionProvider"
import { Collection } from "@/types/Collection"
import { CollectionCategory } from "@/types/CollectionCategory"
import { CollectionItem } from "@/types/CollectionItem"
import { CollectionListAction, CollectionListActionType } from "@/types/hooks/CollectionListAction2"
import { CollectionContextValue } from "@/types/props/CollectionContextValue"
import { useRouter } from "next/navigation"
import { useCallback, useContext, useMemo, useState } from "react"

const tabClasses = "inline-block mr-1 p-4 text-gray-500 rounded-t-lg hover:bg-slate-100 cursor-pointer"
const activeTabClasses = "inline-block mr-1 p-4 text-black rounded-t-lg bg-slate-200 border-b-2 border-black cursor-pointer"

export default function EditCollection({ params: { slug }}: { params: { slug: string } }) {
  const { useCollectionList: {state: { collectionList }, dispatch } } = useContext(CollectionContext)
  const [openTab, setOpenTab] = useState<number>(0)
  
  const collection = useMemo(() => collectionList.find((col) => col.slug === slug), [collectionList, slug])
  
  const addCategory = useCallback((name: string) => {
    dispatch({
      type: CollectionListActionType.ADD_CATEGORY,
      slug: collection?.slug,
      categoryName: name
    } as CollectionListAction)
  }, [collection, dispatch])

  if (!collection) {
    return null
  }
  
  return (
    <div>
      <h2>{collection.name}</h2>
      <div className="border-b border-gray-500">
        <ul className="flex flex-wrap">
          {(collection?.categories ?? []).map((category, index) => (
            <li
              key={`categoryTab-${category.name}`}
              className={index === openTab ? activeTabClasses: tabClasses}
              onClick={() => setOpenTab(index)}
            >
              {category.name}
            </li>
          ))}
          <li className={tabClasses}>
            <AddCollectionCategory onSave={addCategory} />
          </li>
        </ul>
      </div>
      <ItemList items={collection?.categories[openTab]?.itemList} collection={collection} categoryIndex={openTab} />
    </div>
  )
}

function ItemList ({ items, collection, categoryIndex }: {items: CollectionItem[], collection: Collection, categoryIndex: number}) {
  
  return (
    <div>
      {items.map((item) => (
        <div key={`item-${item.name}`} className="border-b p-2 hover:bg-slate-50 flex flex-direction-row space-x-2">
          <div className="font-bold w-40">{item.name}</div>
          <div className="w-32">
            <Toggle disabled value={item.owned} />
          </div>
          <div className="flex-grow">{item.notes}</div>
        </div>
      ))}
      <NewItem collection={collection} categoryIndex={categoryIndex} />
    </div>
  )
}

function NewItem({ collection, categoryIndex}: {collection: Collection, categoryIndex: number}) {
  const { useCollectionList: { dispatch } } = useContext(CollectionContext)
  const [editing, setEditing] = useState<boolean>(false)
  const handleSubmit = (e) => {
    console.log('handling submit')
    e.preventDefault()
    const formData = new FormData(e.target)
    dispatch({
      type: CollectionListActionType.NEW_ITEM,
      item: {
        name: formData.get('name') as string,
        notes: formData.get('notes') as string,
        owned: formData.get('owned') != null
      },
      slug: collection.slug,
      categoryIndex
    })
    e.target.reset()
    document.getElementById('name')?.focus()
  }
  if (!editing) {
    return (
      <div>
        <PrimaryButton size="sm" onClick={() => setEditing(true) }>+ New</PrimaryButton>
      </div>
    )
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="p-2 flex flex-direction-row space-x-2">
        <div className="w-40">
          <Input id="name" placeholder="name" name="name" autoFocus />
        </div>
        <div className="w-32">
          <Toggle name="owned" />
        </div>
        <div className="flex-grow flex flex-direction-row space-x-2">
          <Input placeholder="notes" name="notes" />
          <PrimaryButton type="submit" size="xs">OK</PrimaryButton>
          <SecondaryButton size="xs" onClick={() => {setEditing(false)}}>X</SecondaryButton>
        </div>
      </div>
    </form>
  )
}