"use client"

import Button from "@/components/button"
import useTODOList from "@/hooks/useTODOList"
import { useRouter } from "next/navigation"

export default function PRTIndex() {
  const { data, error, isLoading, update } = useTODOList()
  const router = useRouter()

  if (error) {
    return <div> failed to load TODOs</div>
  }
  if (isLoading) {
    return <div>loading...</div>
  }

  const complete = (todo) => {
    const todoList = data.filter((item) => todo.title !== item.title)
    update(todoList)
  }

  const moveDown = (todo) => {
    const todoList = [...data.filter((item) => todo.title !== item.title), todo]
    update(todoList)
  }

  const edit = (todo) => {
    router.push(`/prt/${todo.id}`)
  }

  return (
    <>
      {data.map(todo => (
        <div key={todo.title} className="border border-black rounded-lg p-2 mb-2 flex flex-row bg-gray-200">
          <span
            className="grow flex flex-col cursor-pointer"
            onClick={() => edit(todo)}
          >
            <span className="font-bold">
              {todo.title}
            </span>
            <span>
              {todo.description}
            </span>
          </span>
          <Button onClick={() => moveDown(todo)}>
            Move Down
          </Button>
          <Button onClick={() => complete(todo)}>
            Complete
          </Button>
        </div>
      ))}
    </>
  )
}
