import { iTodoGroup } from "../iTodoGroup"
import { StoredDataV1 } from "../storedDataV1"

export type IUseTODOList = {
  error: string
  isLoading: boolean
  data?: StoredDataV1
  groupList?: iTodoGroup[] 
  update: Function
}