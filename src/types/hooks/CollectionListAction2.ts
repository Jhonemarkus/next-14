import { Collection } from "../Collection"

export enum CollectionListActionType {
  NEW = "new",
  ADD_CATEGORY = 'addCategory'
}

export type CollectionListAction = {
  type: CollectionListActionType
  newCollection?: Collection
  slug?: string
  categoryName: string
}
