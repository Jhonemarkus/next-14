import { ITodo } from "./iTodo"

export type iTodoGroup = {
  id: string
  name: string
  sequence: number
  todos: {
    [todoId: string]: ITodo
  }
}
