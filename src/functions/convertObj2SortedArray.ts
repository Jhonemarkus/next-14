import { Sortable } from "@/types/sortable"
import { SortableMap } from "@/types/sortableMap"

export function convertObj2SortedArray(obj: SortableMap): Sortable[] {
  return Object.values(obj).sort((a, b) => {
    return a.sequence - b.sequence
  })
}