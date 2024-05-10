"use client"

import TODOForm from "@/components/todoForm"
import { useRouter } from "next/navigation"
import { useContext, useMemo } from "react"
import { useFormState } from "react-dom"
import { ITodo } from "@/types/iTodo"
import { ITodoGroup } from "@/types/iTodoGroup"
import { StoredDataV1 } from "@/types/storedDataV1"
import reSequenceTodosObject from "@/functions/reSequenceTodosObject"
import { iPRTContext, PRTContext } from "@/components/prtProvider"

type IEditTODOParams = {
  params: {
    groupId: string
    todoId: string
  }
}

export default function EditTODO({params}: IEditTODOParams) {
  const router = useRouter()
  const { groupId, todoId } = params
  const {data, isLoading, update, groupList} = useContext<iPRTContext>(PRTContext)?.useTODOList
  const todo = useMemo(() => {
    if (data == null) {
      return null
    }
    const group = data.groups[groupId]
    const todo = group.todos[todoId]
    return todo
  }, [data, groupId, todoId])
  
  const [formState, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    if (data == null) {
      throw new Error('data not available')
    }
    // re-create todo
    const todo: ITodo = {
      id: `${todoId}`,
      title: `${formData.get('title')}`,
      description: `${formData.get('description')}`,
      groupId: `${formData.get('groupId')}`,
      sequence: parseInt(`${formData.get('sequence')}`)
    }
    const newData: StoredDataV1 = {
      version: data?.version,
      groups: {
        ...data.groups
      }
    }
    const oldGroup: ITodoGroup = data.groups[groupId]
    const newGroup: ITodoGroup = data.groups[todo.groupId as string]

    if (groupId != todo.groupId) {
      // Remove from old group
      const oldSequence = data.groups[groupId].todos[todoId].sequence as number
      // delete oldGroup.todos[todoId]
      oldGroup.todos = reSequenceTodosObject(oldGroup.todos, oldSequence)
      newData.groups[groupId] = oldGroup
      // Set new sequence
      todo.sequence = Object.keys(newGroup.todos).length
    }

    newGroup.todos = {
      ...newGroup.todos,
      [todo.id]: todo
    }
    newData.groups[newGroup.id] = newGroup
    update(newData)
    router.push('/prt')
  }, { todo })

  if (isLoading || todo == null) {
    return <div>...loading</div>
  }

  return (
    <>
      <TODOForm action={formAction} todo={todo} groupList={groupList(data)}/>
    </>
  )
}