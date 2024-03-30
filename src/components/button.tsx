import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props}: ButtonProps) {
  return (
    <button
      type="button"
      className="border border-black rounded-lg p-2 mx-1 dark:border-white"
      {...props}
    >
      {children}
    </button>
  )
}