import { Collection } from "@/types/Collection";
import { CollectionListAction, CollectionListActionType } from "@/types/hooks/CollectionListAction2";
import { CollectionListState } from "@/types/hooks/CollectionListState";
import { LocalStorageKeys } from "@/types/LocalStorageKeys";



function saveCollectionList2LocalStorage(state: CollectionListState) {
  if (window?.localStorage) {
    window.localStorage.setItem(LocalStorageKeys.LS_KEY, JSON.stringify(state.collectionList))
  }
  return state
}

export function reducerCollectionList(state: CollectionListState, action: CollectionListAction): CollectionListState {
  switch (action.type) {
    case CollectionListActionType.NEW:
      return saveCollectionList2LocalStorage({
        collectionList: [
          ...state.collectionList,
          action.newCollection!
        ]
      })
    case CollectionListActionType.ADD_CATEGORY:
      const index = state.collectionList.findIndex((col) => col.slug === action.slug)
      if (index == -1) {
        break
      }
      const collection = state.collectionList[index]
      collection.categories.push({
        name: action.categoryName,
        itemList: []
      })
      return saveCollectionList2LocalStorage({
        ...state,
        collectionList: [
          collection,
          ...state.collectionList.splice(index, 1)
        ]
      })
    default:
      console.warn('Invalid type received', { action })
  }
  return state
}
