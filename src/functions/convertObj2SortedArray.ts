import { Sortable } from "@/types/sortable"

export function convertObj2SortedArray<T extends Sortable>(obj: {[id:string]: T}): T[] {
  return Object.values(obj).sort((a, b) => {
    return a.sequence - b.sequence
  })
}