"use client"

import TODOForm from "@/components/todoForm"
import { useRouter } from "next/navigation"

export default function EditTODO({params}) {
  const {id} = params
  
  return (
    <>
      <TODOForm />
    </>
  )
}