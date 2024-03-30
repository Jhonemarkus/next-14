import { iTodoGroup } from "@/types/iTodoGroup"
import { useFormStatus } from "react-dom"
import Button from "./button"

export type iGroupFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  group?: iTodoGroup
}

export default function GroupForm({ action, group }: iGroupFormProps) {
  const { pending } = useFormStatus()
  return (
    <form action={action}>
      <div className="flex flex-col">
        <label htmlFor="title">Group Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="New Group"
          className="text-black mb-2 border-2 rounded-lg px-2"
          defaultValue={group?.name}
          autoFocus
        />

        <input type="hidden" name="id" id="id" value={group?.id} />

        <Button type="submit" aria-disabled={pending}>
          {group == null ? 'Add' : 'Edit'}
        </Button>
      </div>
    </form>
  )
}
