import { ButtonProps } from "@/types/props/buttonProps";

export default function PrimaryButton({ children, size, ...props}: ButtonProps) {
  let className = "border-2 border-black rounded bg-black text-white px-4 py-2"
  if (size === "sm") {
    className = "border-2 border-black rounded bg-black text-white px-2 py-1 text-sm"
  } else if (size === "xs") {
    className = "border-2 border-black rounded bg-black text-white px-2 text-xs"
  }
  return (
    <button
      type="button"
      className={className}
      {...props}
    >
      {children}
    </button>
  )
}