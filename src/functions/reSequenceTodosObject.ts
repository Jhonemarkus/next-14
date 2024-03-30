import { ITodo } from "@/types/iTodo";
import { ITodoGroup } from "@/types/iTodoGroup";

export default function reSequenceTodosObject(todos: ITodoGroup["todos"], sequenceToRemove: number): ITodoGroup["todos"] {
  const newTodos = Object.values(todos).reduce<ITodoGroup["todos"]>((agg, el) => {
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