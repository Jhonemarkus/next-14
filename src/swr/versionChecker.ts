import { ITodoGroup } from "@/types/iTodoGroup"
import convert0to1 from "./convert0to1"
import { StoredDataV1 } from "@/types/storedDataV1"
import { ITodo } from "@/types/iTodo"

export default async function versionChecker(data: any): Promise<StoredDataV1> {
  console.debug("Checking data version.")
  if (data == null) {
    console.debug("Empty data, creating default value.")
    return {
      version: 1,
      groups: {
        "default": {
          id: "default",
          name: "Default",
          sequence: 0,
          todos: {}
        }
      }
    }
  }
  const version = data?.version || 0
  switch (version) {
    case 0:
      return convert0to1(data as ITodo[])
    default:
      console.debug("Data already in latest version.")
      return data
  }
}