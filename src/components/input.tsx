export default function Input (props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input className="w-full border-b border-black text-lg" {...props} />
  )
}
