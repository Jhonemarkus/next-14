import { ReactNode, Suspense } from "react";
import SuspenseLoading from "./loading";

export default async function SuspensePage(): Promise<ReactNode> {
  await new Promise((res) => setTimeout(() => res(), 1000))
  return (
    <div>
      Page content
      {/* <div>
          This will prevent displaying the whole component as the closest suspense is the loading.tsx
          <DelayedComponent delay={900} />
          <DelayedComponent delay={2000} />
          <DelayedComponent delay={3000} />
      </div> */}
      <div>
        <Suspense fallback={<SuspenseLoading />}>
          {/* Will only show components after all have finished loading */}
          <DelayedComponent delay={900} />
          <DelayedComponent delay={2000} />
          <DelayedComponent delay={3000} />
        </Suspense>
      </div>
      <div>
        {/* Will show components as they became available */}
        <div>
          <Suspense fallback={<SuspenseLoading />}>
            <DelayedComponent delay={900} />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<SuspenseLoading />}>
            <DelayedComponent delay={2000} />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<SuspenseLoading />}>
            <DelayedComponent delay={3000} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

async function DelayedComponent({delay = 1000}: {delay: number}): Promise<ReactNode> {
  await new Promise((res) => setTimeout(() => res(), delay))
  return (
    <div>
      Delayed Component {delay}
    </div>
  )
}
