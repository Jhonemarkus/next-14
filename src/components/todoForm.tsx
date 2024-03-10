import { useFormStatus } from "react-dom"
import Button from "./button"
import { ITodo } from "@/types/iTodo"
import { iTodoGroup } from "@/types/iTodoGroup"

type ISubmitButtonProps = {
  text?: string
}

function SubmitButton({text}: ISubmitButtonProps) {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      aria-disabled={pending}
    >
      {text || 'Submit'}
    </Button>
  )
}

export type ITODOFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  groupList: iTodoGroup[]
  todo?: ITodo
}

export default function TODOForm({ action, groupList, todo }: ITODOFormProps) {
  return (
    <form action={action}>
      <div className="flex flex-col">
        <label htmlFor="title">Enter Task</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder="New TODO"
          className="text-black mb-2 border-2 rounded-lg px-2"
          defaultValue={todo?.title}
        />

        <label htmlFor="group">Group</label>
        <select
          id="group"
          name="groupId"
          required
          className="text-black mb-2 border-2 rounded-lg px-2"
          defaultValue={todo?.groupId}
        >
          {groupList.map((group) => (
            <option key={group.id} value={group.id} >{group.name}</option>
          ))}
        </select>

        <label htmlFor="description">Description</label>
        <textarea
          rows={3}
          id="description"
          name="description"
          className="text-black mb-2 border-2 rounded-lg px-2"
          defaultValue={todo?.description}
        />

        <input type="hidden" name="sequence" defaultValue={todo?.sequence} />
        <SubmitButton text={todo == null ? 'Add' : 'Edit'} />
      </div>
    </form>
  )
}
