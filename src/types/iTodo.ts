export type ITodo = {
  id: string
  groupId: string //optional for compatibility with stored data v0
  sequence: number //optional for compatibility with stored data v0
  title: string
  description: string
}
