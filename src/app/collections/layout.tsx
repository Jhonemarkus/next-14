import Link from "next/link"

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="p-2">
      <h1>Colelctions</h1>
      <div className="flex flex-row">
        <div className="w-64" >
          <Link href="/collections/new">
            New Collection
          </Link>
        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}
