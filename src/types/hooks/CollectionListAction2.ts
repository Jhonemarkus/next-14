import { Collection } from "../Collection"

export enum CollectionListActionType {
  NEW = "new"
}

export type CollectionListAction = {
  type: CollectionListActionType
  newCollection?: Collection
}
