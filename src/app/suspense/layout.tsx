import { ReactNode } from "react";

export default function SuspenseLayout({children}: {children: ReactNode}): ReactNode {
  return (
    <div>
      <h1>Suspense sample</h1>
      <div>{children}</div>
    </div>
  )
}
