import MenuLink from "@/components/menuLink"
import CollectionProvider from "../../providers/collectionProvider"

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
          <ul>
            <li>
              <MenuLink href="/collections">
                List Collections
              </MenuLink>
            </li>
            <li>
              <MenuLink href="/collections/new">
                New Collection
              </MenuLink>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <CollectionProvider>
            {children}
          </CollectionProvider>
        </div>
      </div>
    </div>
  )
}
