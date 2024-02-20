import { useFormStatus } from "react-dom"
import Button from "./button"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      aria-disabled={pending}
    >
      Add
    </Button>
  )
}

export default function TODOForm({action}) {
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
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows="3"
          id="description"
          name="description"
          className="text-black mb-2 border-2 rounded-lg px-2"
        />

        <SubmitButton />
      </div>
    </form>
  )
}
