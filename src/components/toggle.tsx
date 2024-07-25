export type ToggleProps = {
  value: boolean
  disabled?: boolean
}


export default function Toggle ({ value, disabled }: ToggleProps) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" checked={value} className="sr-only peer" />
      <div className={`relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-focus:outline-none 
        after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border 
        after:rounded-full after:h-5 after:w-5 after:transition-all
        peer-checked:after:border-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full`} />
      <span className="ms-3 text-sm font-medium text-gray-900">Owned</span>
    </label>
  )
}