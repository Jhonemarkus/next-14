'use client'

import { revalidatePath } from "next/cache"
import { redirect } from "next/dist/server/api-utils"
import { useFormState, useFormStatus } from "react-dom"
import { useMemo } from "react"
import useTODOList from "@/hooks/useTODOList"
import { useRouter } from "next/navigation"
import { randomUUID } from "crypto"
import TODOForm from "@/components/todoForm"
import { group } from "console"
import { ITodoGroup } from "@/types/iTodoGroup"
import { StoredDataV1 } from "@/types/storedDataV1"
import { ITodo } from "@/types/iTodo"

export default function NewTODO() {
  const router = useRouter()
  const {isLoading, update, data, groupList } = useTODOList()
  const [formState, formAction]  = useFormState(async (prevState: any, formData: FormData) => {
    if (data == null) {
      return
    }
    const todo: ITodo = {
      id: `${new Date().getTime()}`,
      title: `${formData.get('title')}`,
      description: `${formData.get('description')}`,
      groupId: `${formData.get('groupId')}`,
      sequence: -1
    }
    const group: ITodoGroup = {...data.groups[todo.groupId]}
    todo.sequence = Object.keys(group?.todos).length
    group.todos = {
      ...group.todos,
      [todo.id]: todo
    }
    const newData: StoredDataV1 = {
      version: data?.version,
      groups: {
        ...data.groups,
        [group.id]: group
      }
    }
    update(newData)
    router.push('/prt')
  }, { todo: null})

  if (isLoading) {
    return <div>...loading</div>
  }

  return (<TODOForm action={formAction} groupList={groupList(data)} />)
}