"use client"

import TODOForm from "@/components/todoForm"
import useTODOList from "@/hooks/useTODOList"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import { useFormState } from "react-dom"
import { ITodo } from "../../../types/iTodo"
import { iTodoGroup } from "@/types/iTodoGroup"
import { StoredDataV1 } from "@/types/storedDataV1"

type IEditTODOParams = {
  params: {
    id: string
  }
}

export default function EditTODO({params}: IEditTODOParams) {
  const router = useRouter()
  const {groupId, todoId} = params
  const {data, isLoading, update, groupList} = useTODOList()
  const todo = useMemo(() => {
    if (data == null) {
      return null
    }
    const group = data.groups[groupId]
    const todo = group.todos[todoId]
    return todo
  }, [data, groupId, todoId])
  
  const [formState, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    const todo: ITodo = {
      id: `${todoId}`,
      title: `${formData.get('title')}`,
      description: `${formData.get('description')}`,
      groupId: `${formData.get('groupId')}`,
      sequence: parseInt(`${formData.get('sequence')}`)
    }
    const group:iTodoGroup = data?.groups[todo.groupId]
    group.todos = {
      ...group.todos,
      [todo.id]: todo
    }
    const newData: StoredDataV1 = {
      version: data?.version,
      groups: {
        ...data.groups,
        [groupId]: group
      }
    }
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