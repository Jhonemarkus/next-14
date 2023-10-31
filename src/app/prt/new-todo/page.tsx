'use client'

import { revalidatePath } from "next/cache"
import { redirect } from "next/dist/server/api-utils"
import { useFormState, useFormStatus } from "react-dom"
import { createTODO } from "../actions"
import { useMemo } from "react"
import useTODOList from "@/hooks/useTODOList"
import { useRouter } from "next/navigation"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  )
}

export default function NewTODO() {
  const router = useRouter()
  const {isLoading, update, data, key } = useTODOList()
  const [formState, formAction]  = useFormState(async (prevState: any, formData: FormData) => {
    const todo = {
      title: formData.get('title')
    }
    const todoList = [...data, todo]
    update(todoList)
    router.push('/prt')
  }, { todo: null})

  if (isLoading) {
    return <div>...loading</div>
  }

  return (
    <form action={formAction}>
      <div className="flex flex-col">
        <label htmlFor="title">Enter Task</label>
        <input type="text" id="title" name="title" required placeholder="New TODO" className="text-black" />
        <SubmitButton />
      </div>
    </form>
  )
}