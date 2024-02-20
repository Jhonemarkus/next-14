"use client"

import TODOForm from "@/components/todoForm"
import { useRouter } from "next/navigation"

type IEditTODOParams = {
  params: {
    id: string
  }
}

export default function EditTODO({params}: IEditTODOParams) {
  const {id} = params
  
  return (
    <>
      <TODOForm action={"#"}/>
    </>
  )
}