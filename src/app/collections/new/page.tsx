'use client'

import { useFormState, useFormStatus } from "react-dom"
import { createCollection } from "./actions"


export default function NewCollection() {
  const [state, formAction] = useFormState<NewCollectionForm>(createCollection, { name: '' })
  console.log("form state", state)
  return (
    <div>
      <h2>New Collection</h2>
      <form className="flex flex-col mt-4" action={formAction}>
        <div className="flex flex-row">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" className="ml-2" defaultValue={state.name} autoFocus />
        </div>
        <div className="mt-2">
          <button disabled={false} type="submit">Create</button>
        </div>
      </form>
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
    </div>
  )
}
