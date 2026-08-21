import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { supabase } from './lib/supabase'

const {
  data: { session },
} = await supabase.auth.getSession()

export const router = createRouter({
  routeTree,
  context: {
    user: session?.user ?? null,
  },
})
supabase.auth.onAuthStateChange((_event, session) => {
  router.update({
    context: {
      user: session?.user ?? null,
    },
  })
})
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<RouterProvider router={router} />)
}
