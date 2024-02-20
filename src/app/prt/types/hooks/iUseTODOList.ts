import { ITodo } from "../iTodo"

export type IUseTODOList = {
  error: string
  isLoading: boolean
  data: ITodo[]
  update: Function
}