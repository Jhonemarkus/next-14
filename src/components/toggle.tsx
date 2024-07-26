export type ToggleProps = {
  value: boolean
  disabled?: boolean
  name?: string
}


export default function Toggle ({ value, disabled, name }: ToggleProps) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" value={true} name={name} defaultChecked={value} className="sr-only peer" />
      <div className={`relative w-11 h-6 bg-gray-200 rounded-full
        peer peer-checked:bg-blue-600
        peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-600
        after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border 
        after:rounded-full after:h-5 after:w-5 after:transition-all
        peer-checked:after:border-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full`} />
      <span className="ms-3 text-sm font-medium text-gray-900">Owned</span>
    </label>
  )
}