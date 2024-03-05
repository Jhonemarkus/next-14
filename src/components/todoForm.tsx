import { useFormStatus } from "react-dom"
import Button from "./button"
import { ITodo } from "@/app/prt/types/iTodo"

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

export type ITODOFormProps = React.FormHTMLAttributes<HTMLFormElement & {
  todo: ITodo
}>

export default function TODOForm({ action, todo }: ITODOFormProps) {
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

        <label htmlFor="description">Description</label>
        <textarea
          rows={3}
          id="description"
          name="description"
          className="text-black mb-2 border-2 rounded-lg px-2"
          defaultValue={todo?.description}
        />
        <SubmitButton text={todo == null ? 'Add' : 'Edit'} />
      </div>
    </form>
  )
}
