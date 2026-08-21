import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { User } from '@supabase/supabase-js'

import '../styles.css'

export interface RouterContext {
  user: User | null
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="min-h-dvh flex justify-center  border-white border-4">
      <div
        className="
          w-full
          max-w-xl
          px-4
          flex
          flex-col
          min-h-dvh
        "
      >
        <Outlet />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'TanStack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </div>
    </div>
  )
}
