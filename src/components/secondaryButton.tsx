import { ButtonProps } from "@/types/props/buttonProps";

export default function SecondaryButton({ children, ...props}: ButtonProps) {
  return (
    <button
      type="button"
      className="border-2 border-black rounded px-4 py-2"
      {...props}
    >
      {children}
    </button>
  )
}