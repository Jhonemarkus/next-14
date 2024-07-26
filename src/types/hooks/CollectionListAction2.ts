import { Collection } from "../Collection"
import { CollectionItem } from "../CollectionItem"

export enum CollectionListActionType {
  NEW = "new",
  ADD_CATEGORY = 'addCategory',
  NEW_ITEM = 'newItem'
}

export type CollectionListAction = {
  type: CollectionListActionType
  newCollection?: Collection
  slug?: string
  categoryName?: string
  categoryIndex?: number
  item?: CollectionItem
}
