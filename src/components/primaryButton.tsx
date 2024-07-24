import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function PrimaryButton({ children, ...props}: ButtonProps) {
  return (
    <button
      type="button"
      class="border-2 border-black rounded bg-black text-white px-4 py-2"
      {...props}
    >
      {children}
    </button>
  )
}