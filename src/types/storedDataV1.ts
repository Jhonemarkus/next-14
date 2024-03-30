import { ITodoGroup } from "./iTodoGroup"

export type StoredDataV1 = {
  version: number
  groups: {
    [groupId: string]: ITodoGroup
  }
}
