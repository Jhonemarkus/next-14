'use client'

import { revalidatePath } from "next/cache"
import { redirect } from "next/dist/server/api-utils"
import { useFormState, useFormStatus } from "react-dom"
import { useMemo } from "react"
import useTODOList from "@/hooks/useTODOList"
import { useRouter } from "next/navigation"
import { randomUUID } from "crypto"
import TODOForm from "@/components/todoForm"

export default function NewTODO() {
  const router = useRouter()
  const {isLoading, update, data } = useTODOList()
  const [formState, formAction]  = useFormState(async (prevState: any, formData: FormData) => {
    const todo = {
      id: `${new Date().getTime()}`,
      title: formData.get('title'),
      description: formData.get('description')
    }
    const todoList = [...data, todo]
    update(todoList)
    router.push('/prt')
  }, { todo: null})

  if (isLoading) {
    return <div>...loading</div>
  }

  return (<TODOForm action={formAction} />)
}