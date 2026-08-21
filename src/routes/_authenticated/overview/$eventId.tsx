import {
  createFileRoute,
  notFound,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { useState } from 'react'
import BackChevron from '../../../icons/back-chevron'
import { supabase } from '#/lib/supabase'

export const Route = createFileRoute('/_authenticated/overview/$eventId')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: '/login',
      })
    }
  },

  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', params.eventId)
      .single()

    if (error || !data) {
      throw notFound()
    }

    return {
      event: data,
    }
  },

  component: EventDetails,
})

function EventDetails() {
  const { event } = Route.useLoaderData()
  const navigate = useNavigate()

  const [eventName, setEventName] = useState(event.event_name ?? '')

  const [location, setLocation] = useState(event.location ?? '')

  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSave = async () => {
    if (!eventName.trim() || !location.trim()) {
      return
    }

    setIsSaving(true)
    setErrorMessage('')

    const { error } = await supabase
      .from('events')
      .update({
        event_name: eventName.trim(),
        location: location.trim(),
      })
      .eq('id', event.id)

    if (error) {
      console.error(error)

      setErrorMessage('Something went wrong while saving the event.')

      setIsSaving(false)
      return
    }

    setIsSaving(false)

    navigate({
      to: '/overview',
    })
  }

  return (
    <div className="min-h-dvh bg-white">
      {/* Header */}
      <header className="mx-auto flex h-16 w-full max-w-xl items-center justify-between px-4">
        <button
          type="button"
          onClick={() => navigate({ to: '/overview' })}
          className="
            flex
            h-11
            min-w-11
            items-center
            justify-center
            rounded-full
            active:scale-90
          "
        >
          <BackChevron className="h-6 w-6" />
        </button>

        <span className="text-base font-bold tracking-wide">EDIT EVENT</span>

        <div className="min-w-11" />
      </header>

      {/* Form */}
      <main className="mx-auto w-full max-w-xl px-4 pb-32 pt-8">
        <div className="space-y-4">
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Event title"
            className="
              h-14
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              px-4
              text-base
              outline-none
              focus:border-black
              focus:bg-white
              focus:ring-4
              focus:ring-black/5
            "
          />

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="
              h-14
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              px-4
              text-base
              outline-none
              focus:border-black
              focus:bg-white
              focus:ring-4
              focus:ring-black/5
            "
          />

          {errorMessage && (
            <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
              {errorMessage}
            </div>
          )}
        </div>
      </main>

      {/* Save */}
      <footer
        className="
          fixed
          inset-x-0
          bottom-0
          border-t
          border-gray-100
          bg-white
        "
        style={{
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="mx-auto w-full max-w-xl p-4">
          <button
            type="button"
            disabled={isSaving || !eventName.trim() || !location.trim()}
            onClick={handleSave}
            className="
              flex
              h-14
              w-full
              items-center
              justify-center
              rounded-2xl
              bg-black
              text-base
              font-semibold
              text-white
              active:scale-[0.98]
              disabled:bg-gray-200
              disabled:text-gray-400
            "
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </footer>
    </div>
  )
}
