import Link, { LinkProps } from "next/link";

export interface MenuLinkProps extends LinkProps {
  children: React.ReactNode;
}

export default function MenuLink({ children, ...props}: MenuLinkProps) {
  return (
    <Link
      className="bg-slate-200 border-b-2 border-black block w-full p-2 mb-1"
      {...props}
    >
      {children}
    </Link>
  )
}