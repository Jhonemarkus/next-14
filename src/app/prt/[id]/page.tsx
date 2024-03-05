"use client"

import TODOForm from "@/components/todoForm"
import useTODOList from "@/hooks/useTODOList"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import { useFormState } from "react-dom"
import { ITodo } from "../types/iTodo"

type IEditTODOParams = {
  params: {
    id: string
  }
}

export default function EditTODO({params}: IEditTODOParams) {
  const router = useRouter()
  const {id} = params
  const {data, isLoading, update} = useTODOList()
  const todo = useMemo(() => {
    return (data || []).find(el => el.id === id)
  }, [data, id])
  
  const [formState, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    const todo: ITodo = {
      id: `${id}`,
      title: `${formData.get('title')}`,
      description: `${formData.get('description')}`
    }
    const todoIndex = data.findIndex(el => el.id === id)
    const todoList = [...data]
    todoList[todoIndex] = todo
    update(todoList)
    router.push('/prt')
  }, { todo })

  if (isLoading || todo == null) {
    return <div>...loading</div>
  }


  return (
    <>
      <TODOForm action={formAction} todo={todo}/>
    </>
  )
}