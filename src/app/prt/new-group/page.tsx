'use client'

import GroupForm from "@/components/groupForm";
import useTODOList from "@/hooks/useTODOList";
import { ITodoGroup } from "@/types/iTodoGroup";
import { StoredDataV1 } from "@/types/storedDataV1";
import { useRouter } from "next/navigation";
import { version } from "os";
import { useFormState } from "react-dom";

export default function NewGroupPage() {
  const router = useRouter()
  const {data, isLoading, update} = useTODOList()
  const [formState, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    if (data == null) {
      return
    }
    const group:ITodoGroup = {
      id: `${new Date().getTime()}`,
      name: `${formData.get('name')}`,
      sequence: Object.keys(data.groups).length,
      todos: {}
    }
    const newData:StoredDataV1 = {
      version: data?.version,
      groups: {
        ...data.groups,
        [group.id]: group
      }
    }
    update(newData)
    router.push('/prt')
  }, { name: '' })

  if (isLoading) {
    return <>...loading</>
  }

  return (
    <>
      <h2>New Group</h2>
      <GroupForm action={formAction} />
    </>
  )
}
