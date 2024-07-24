import MenuLink from "@/components/menuLink"

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="p-2">
      <h1>Colelctions</h1>
      <div className="flex flex-row">
        <div className="w-64 mr-2">
          <MenuLink href="/collections/new">
            New Collection
          </MenuLink>
        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}
