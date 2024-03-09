import { iTodoGroup } from "@/types/iTodoGroup"
import { VersionedData } from "@/app/prt/types/versionedDataType"
import convert0to1 from "./convert0to1"
import { StoredDataV1 } from "@/types/storedDataV1"
import { ITodo } from "@/types/iTodo"

export default async function versionChecker(data: any): StoredDataV1 {
  if (data == null) {
    return null
  }
  const version = data?.version || 0
  switch (version) {
    case 0:
      return convert0to1(data as ITodo[])
    default:
      return data
  }
}