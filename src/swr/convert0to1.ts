import { ITodo } from "@/types/iTodo";
import { iTodoGroup } from "@/types/iTodoGroup";
import { StoredDataV1 } from "@/types/storedDataV1";
import { VersionedData } from "@/app/prt/types/versionedDataType";

export default function convert0to1(oldData: ITodo[]): StoredDataV1 {
  console.info("Converting old data from version 0 to 1", oldData)
  let newData: StoredDataV1 = {
    version: 1,
    groups: {
      "default": {
        id: "default",
        name: "Default",
        sequence: 0,
        todos: oldData.reduce((agg, todo, index)=> {
          agg[todo.id] = {
            ...todo,
            groupId: 'default',
            sequence: index
          }
          return agg
        }, {})
      }
    }
  }
  console.debug("Convertion completed", newData)
  return newData
}
