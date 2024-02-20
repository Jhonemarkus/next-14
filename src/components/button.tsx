import { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes & {
  children: React.ReactNode
}

export default function Button({ children, ...props}: ButtonProps) {
  return (
    <button
      type="button"
      className="border border-black rounded-lg p-2 mx-1"
      {...props}
    >
      {children}
    </button>
  )
}