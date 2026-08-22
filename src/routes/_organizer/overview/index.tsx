import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'

import Event from '../../../components/event'
import { supabase } from '#/lib/supabase'

export const Route = createFileRoute('/_organizer/overview/')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: '/login',
      })
    }
  },

  loader: async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', {
        ascending: false,
      })

    if (error) {
      throw error
    }

    return {
      events: data ?? [],
    }
  },

  component: Overview,
})

function Overview() {
  const { events } = Route.useLoaderData()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate({ to: '/login' })
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      {/* HEADER */}
      <header
        className="
          sticky
          top-0
          z-20
          border-b
          border-gray-200
          bg-white
        "
        style={{
          paddingTop: 'env(safe-area-inset-top)',
        }}
      >
        <div className="mx-auto flex h-16 w-full max-w-xl items-center justify-between px-4">
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              h-11
              min-w-11
              items-center
              justify-center
              rounded-xl
              px-2
              text-xs
              font-semibold
              text-gray-500
              active:bg-gray-100
              active:scale-95
            "
          >
            Logout
          </button>

          <span className="gradient-text text-[15px] font-extrabold">
            CONSCIOUS ACCESS
          </span>

          <div className="min-w-11" />
        </div>
      </header>

      {/* EVENTS */}
      <main
        className="mx-auto w-full max-w-xl px-4 pt-5"
        style={{
          paddingBottom: 'calc(88px + env(safe-area-inset-bottom))',
        }}
      >
        {events.length === 0 ? (
          <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
            <h2 className="text-lg font-bold text-gray-900">No events yet</h2>

            <p className="mt-2 text-sm text-gray-500">
              Create your first event.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <Event key={event.id} event={event} />
            ))}
          </div>
        )}
      </main>

      {/* CREATE EVENT */}
      <footer
        className="
          fixed
          inset-x-0
          bottom-0
          z-30
          border-t
          border-gray-200
          bg-white
        "
        style={{
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="mx-auto w-full max-w-xl p-4">
          <button
            type="button"
            onClick={() =>
              navigate({
                to: '/create-event',
              })
            }
            className="
              flex
              h-14
              w-full
              items-center
              justify-center
              rounded-2xl
              bg-black
              px-4
              text-base
              font-bold
              tracking-wide
              text-white
              shadow-lg
              shadow-black/10
              active:scale-[0.98]
            "
          >
            CREATE EVENT
          </button>
        </div>
      </footer>
    </div>
  )
}
