import { iTodoGroup } from "@/types/iTodoGroup"

export type iGroupFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  group?: iTodoGroup
}

export default function GroupForm({ action, group }: iGroupFormProps) {
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
        />

        {/* <SubmitButton text={group == null ? 'Add' : 'Edit'} /> */}
      </div>
    </form>
  )
}
