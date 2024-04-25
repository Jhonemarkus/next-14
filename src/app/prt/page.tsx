"use client"

import Button from "@/components/button"
import useTODOList from "@/hooks/useTODOList"
import { useRouter } from "next/navigation"
import { ITodo } from "../../types/iTodo"
import { ITodoGroup } from "../../types/iTodoGroup"
import { verify } from "crypto"
import { StoredDataV1 } from "../../types/storedDataV1"
import { convertObj2SortedArray } from "@/functions/convertObj2SortedArray"
import { useCallback } from "react"
import Link from "next/link"
import { trace } from "@opentelemetry/api"

const tracer = trace.getTracer("PRT")

export default function PRTIndex() {
  return tracer.startActiveSpan("Render_List_Page", (span) => {
    try {
      const { data, error, isLoading, update, groupList } = useTODOList()
      const router = useRouter()

      const complete = useCallback((todo: ITodo) => {
        if (data == null) {
          return
        }
        const group: ITodoGroup = data.groups[todo.groupId]
        group.todos = Object.values(group.todos).reduce<{[todoId: string]: ITodo}>((agg, el) => {
          if (el.id !== todo.id) {
            if (el.sequence > todo.sequence) {
              el.sequence -= 1
            }
            agg[el.id] = el
          }
          return agg
        }, {})
        const newData: StoredDataV1 = {
          version: data?.version,
          groups: {
            ...data.groups,
            [group.id]: group
          }
        }
        update(newData)
      },[update, data])

      const moveDown = useCallback((todo: ITodo) => {
        if (data == null) {
          return
        }
        const group = data.groups[todo.groupId]
        const todoList = Object.values(group.todos).map((el) => {
          let sequence = el.sequence
          if (el.sequence == todo.sequence) {
            sequence = Object.keys(group.todos).length - 1
          } else if (el.sequence > todo.sequence) {
            sequence -= 1
          }
          return {
            ...el,
            sequence
          }
        })
        group.todos = todoList.reduce<{[todoId: string]: ITodo}>((agg, el) => {
          agg[el.id] = el
          return agg
        }, {})
        const newData: StoredDataV1 = {
          version: data?.version,
          groups: {
            ...data?.groups,
            [group.id]: group
          }
        }
        update(newData)
      },[data,update])

      const edit = useCallback((todo: ITodo) => {
        router.push(`/prt/${todo.groupId}/${todo.id}`)
      },[router])

      const renderTodoList = useCallback((list: ITodo[]) => {
        return (
          <>
            {list.map((todo: ITodo) => (
              <div key={todo.title} className="border border-black rounded-lg p-2 mb-2 flex flex-row bg-gray-200 dark:border-white dark:bg-gray-800">
                <span
                  className="grow flex flex-col cursor-pointer"
                  onClick={() => edit(todo)}
                >
                  <span className="font-bold">
                    {todo.sequence} - {todo.title}
                  </span>
                  <span>
                    {todo.description}
                  </span>
                </span>
                <Button onClick={() => moveDown(todo)}>
                  <>Move Down</>
                </Button>
                <Button onClick={() => complete(todo)}>
                <>Complete</>
                </Button>
              </div>
            ))}
          </>
        )
      },[moveDown, complete, edit])

      if (error) {
        return <div> failed to load TODOs</div>
      }

      if (isLoading) {
        return <div>loading...</div>
      }

      return (
        <>
          <h1>Inside Span</h1>
          {groupList(data).map((group: ITodoGroup) => (
            <div key={`group-${group.id}`}>
              <Link href={`/prt/${group.id}`}>
                <div>Group: {group.name}</div>
              </Link>
              <div>
                {renderTodoList(convertObj2SortedArray<ITodo>(group.todos))}
              </div>
            </div>
          ))}
        </>
      )
    } finally {
      span.end()
    }
  })
}
