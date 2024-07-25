'use client'

import PrimaryButton from "@/components/primaryButton"
import Toggle from "@/components/toggle"
import { CollectionContext } from "@/providers/collectionProvider"
import { Collection } from "@/types/Collection"
import { CollectionCategory } from "@/types/CollectionCategory"
import { CollectionItem } from "@/types/CollectionItem"
import { CollectionListActionType } from "@/types/hooks/CollectionListAction2"
import { useRouter } from "next/navigation"
import { useContext, useMemo, useState } from "react"

export default function EditCollection({ params: { slug }}) {
  const { useCollectionList: {state: { collectionList }, dispatch } } = useContext(CollectionContext)
  const collection = useMemo(() => collectionList.find((col) => col.slug === slug), [collectionList, slug])
  if (!collection) {
    return null
  }
  return (
    <div>
      <h2>{collection.name}</h2>
      {/* Tabs */}
      <CategoryTabs categories={collection?.categories} />
      
    </div>
  )
}

const tabClasses = "inline-block mr-1 p-4 text-gray-500 rounded-t-lg hover:bg-slate-100 cursor-pointer"
const activeTabClasses = "inline-block mr-1 p-4 text-black rounded-t-lg bg-slate-200 border-b-2 border-black cursor-pointer"

function CategoryTabs ({categories}: {categories: CollectionCategory[]}) {
  const [openTab, setOpenTab] = useState<number>(0)

  return (
    <div>
      <div className="border-b border-gray-500">
        <ul className="flex flex-wrap">
          {categories.map((category, index) => (
            <li
              key={`categoryTab-${category.name}`}
              className={index === openTab ? activeTabClasses: tabClasses}
              onClick={() => setOpenTab(index)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <ItemList items={categories[openTab].itemList} />
    </div>
  )
}

function ItemList ({ items }: {items: CollectionItem[]}) {
  return (
    <div>
      {items.map((item) => (
        <div key={`item-${item.name}`} className="border-b p-2 hover:bg-slate-50 flex flex-direction-row space-x-2">
          <div className="font-bold">{item.name}</div>
          <div>
            <Toggle disabled value={item.owned} />
          </div>
          <div>{item.notes}</div>
        </div>
      ))}
    </div>
  )
}