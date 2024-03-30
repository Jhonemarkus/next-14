import { ITodo } from "@/types/iTodo";
import { iTodoGroup } from "@/types/iTodoGroup";


export default function reSequenceTodosObject(todos, sequenceToRemove: number) {
  const newTodos = Object.values(todos).reduce((agg: object, el: ITodo) => {
    if (el.sequence == sequenceToRemove) {
      return agg
    }
    if (el.sequence > sequenceToRemove) {
      el.sequence -= 1
    }
    agg[el.id] = el
    return agg
  },{})
  return newTodos
}