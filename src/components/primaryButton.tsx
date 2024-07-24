import { ButtonProps } from "@/types/props/buttonProps";

export default function PrimaryButton({ children, ...props}: ButtonProps) {
  return (
    <button
      type="button"
      className="border-2 border-black rounded bg-black text-white px-4 py-2"
      {...props}
    >
      {children}
    </button>
  )
}