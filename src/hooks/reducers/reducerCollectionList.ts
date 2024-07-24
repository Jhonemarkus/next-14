import { Collection } from "@/types/Collection";
import { CollectionListAction, CollectionListActionType } from "@/types/hooks/CollectionlistAction";
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
    default:
      console.warn('Invalid type received', { action })
  }
  return state
}
