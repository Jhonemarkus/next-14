'use client'

import Button from "@/components/button";
import GroupForm from "@/components/groupForm";
import { iPRTContext, PRTContext } from "@/components/prtProvider";
import { ITodoGroup } from "@/types/iTodoGroup";
import { StoredDataV1 } from "@/types/storedDataV1";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useMemo } from "react";
import { useFormState } from "react-dom";

type IEditGroupParams = {
  params: {
    groupId: string
  }
}

export default function EditGroupPage({ params }: IEditGroupParams) {
  const { groupId } = params
  const router = useRouter()
  const {data, isLoading, update} = useContext<iPRTContext>(PRTContext)?.useTODOList
  const group = useMemo(() => {
    return data?.groups[groupId]
  }, [data, groupId])

  const [formState, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    if (data == null || group == null) {
      return
    }
    const newGroup: ITodoGroup = {...group}
    newGroup.name = `${formData.get('name')}`
    const newData:StoredDataV1 = {
      version: data.version,
      groups: {
        ...data.groups,
        [group.id]: newGroup
      }
    }
    update(newData)
    router.push('/prt')
  }, group)

  const deleteGroup = useCallback(() => {
    if (data == null) {
      return
    }
    const newData: StoredDataV1 = {...data}
    delete newData.groups[groupId]
    update(newData)
    router.push('/prt')
  }, [data, groupId, update, router])

  if (isLoading) {
    return <>...loading</>
  }

  return (
    <>
      <h2>Edit Group</h2>
      <GroupForm action={formAction} group={group} />
      <Button onClick={deleteGroup}>
        Delete
      </Button>
    </>
  )
}
