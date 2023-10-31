import Link from "next/link"

export default function PRTLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-row m-8">
      <div className="p-2">
        <ul>
          <li>
            <Link href={"/prt"}>
              List
            </Link>
          </li>
          <li>
            <Link href={"/prt/new-todo"}>
              New TODO
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-2 grow">
        {children}
      </div>
    </div>
  )
}
