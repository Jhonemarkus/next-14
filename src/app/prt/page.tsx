"use client"

import useTODOList from "@/hooks/useTODOList"

export default function PRTIndex() {
  const { data, error, isLoading, update } = useTODOList()
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

  return (
    <>
      {data.map(todo => (
        <div key={todo.title} className="border border-black dark:border-white p-2 mb-2 flex flex-row">
          <span className="grow">
            {todo.title}
          </span>
          <button
            type="button"
            onClick={() => complete(todo)}
            className="border dark:border-white p-2 mx-1"
          >
            Complete
          </button>
        </div>
      ))}
    </>
  )
}
