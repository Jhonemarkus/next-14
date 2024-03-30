import { ITodo } from "./iTodo"

export type ITodoGroup = {
  id: string
  name: string
  sequence: number
  todos: {
    [todoId: string]: ITodo
  }
}
