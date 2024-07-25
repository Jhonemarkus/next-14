import { KeyboardEventHandler, useState } from "react"

export default function AddCollectionCategory ({ onSave }: { onSave: Function}) {
  const [editing, setEditing] = useState<boolean>(false)
  
  const hanldeKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      if (onSave) {
        onSave(e.target.value)
        setEditing(false)
      }
    } else if (e.keyCode === 27) {
      setEditing(false)
    }
  }

  if (!editing) {
    return (
      <div onClick={() => setEditing(true)}>+</div>
    )
  }

  return (
    <input placeholder="[name]" onKeyDown={hanldeKeyDown} />
  )
}
