'use client'

import { Collection } from "@/types/Collection";
import { CollectionListAction, CollectionListActionType } from "@/types/hooks/CollectionListAction2";
import { CollectionListState } from "@/types/hooks/CollectionListState";
import { LocalStorageKeys } from "@/types/LocalStorageKeys";

const isBrowser = () => typeof window !== 'undefined';

function saveCollectionList2LocalStorage(state: CollectionListState) {
  if (isBrowser()) {
    window.localStorage.setItem(LocalStorageKeys.LS_KEY, JSON.stringify(state.collectionList))
  }
  return state
}

export function reducerCollectionList(state: CollectionListState, action: CollectionListAction): CollectionListState {
  switch (action.type) {
    case CollectionListActionType.NEW:
      console.log('new collection action')
      return saveCollectionList2LocalStorage({
        collectionList: [
          action.newCollection!,
          ...state.collectionList
        ]
      })
    case CollectionListActionType.ADD_CATEGORY:
      return addCategory(state, action)
    default:
      console.warn('Invalid type received', { action })
  }
  return state
}

function addCategory(state: CollectionListState, action: CollectionListAction) {
  console.log('add category')
  const index = state.collectionList.findIndex((col) => col.slug === action.slug)
  if (index == -1) {
    console.log('collection not found')
    return state
  }
  const collection = { ...state.collectionList[index] }
  const existingCategory = collection.categories.find((cat) => cat.name === action.categoryName)
  if (existingCategory != null) {
    console.log('existing category', {existingCategory})
    return state
  }
  collection.categories.push({
    name: action.categoryName,
    itemList: []
  })
  return saveCollectionList2LocalStorage({
    ...state,
    collectionList: [
      collection,
      ...state.collectionList.filter((el, i) => i !== index)
    ]
  })
}