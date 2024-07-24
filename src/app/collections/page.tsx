'use client'

import Link from "next/link";
import useCollectionList from '@/hooks/useCollectionList'
import { useContext } from 'react'
import { CollectionContext } from "@/providers/collectionProvider";

export default function CollectionList () {
  const {useCollectionList: {state}} = useContext(CollectionContext)
  console.log(state)
  return (
    <div>
      [List]
    </div>
  )
}