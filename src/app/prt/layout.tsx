import Backup from "@/components/backup"
import Link from "next/link"

export default function PRTLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-row m-8">
      <div className="p-2 w-60">
        <ul>
          <li>
            <Link href={"/prt"}>
              List
            </Link>
          </li>
          <li>
            <Link href={"/prt/new-group"}>
              New Group
            </Link>
          </li>
          <li>
            <Link href={"/prt/new-todo"}>
              New TODO
            </Link>
          </li>
        </ul>
        <div className="m-b-0">
          <Backup />
        </div>
      </div>
      <div className="p-2">
        {children}
      </div>
    </div>
  )
}
