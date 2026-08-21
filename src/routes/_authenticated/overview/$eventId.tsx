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

  component: EditEvent,
})

function EditEvent() {
  const { event } = Route.useLoaderData()
  const navigate = useNavigate()

  const [eventName, setEventName] = useState(event.event_name ?? '')

  const [eventDate, setEventDate] = useState(event.event_date ?? '')

  const [startTime, setStartTime] = useState(event.start_time ?? '')

  const [endTime, setEndTime] = useState(event.end_time ?? '')

  const [location, setLocation] = useState(event.location ?? '')

  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const canSave = Boolean(
    eventName.trim() && eventDate && startTime && location.trim(),
  )

  const handleSave = async () => {
    if (!canSave || isSaving) return

    setIsSaving(true)
    setErrorMessage('')

    const { data, error } = await supabase
      .from('events')
      .insert({
        event_name: eventName.trim(),
        location: location.trim(),
        event_date: eventDate,
        start_time: startTime,
        end_time: endTime,
      })
      .select()
      .single()

    if (error) {
      console.error('Error updating event:', error)

      setErrorMessage('Something went wrong while saving the event.')

      setIsSaving(false)
      return
    }
    console.log('data', data)
    navigate({
      to: '/overview',
    })
  }

  const handleDelete = async () => {
    if (isDeleting) return

    const confirmed = window.confirm(
      'Are you sure you want to delete this event?',
    )

    if (!confirmed) return

    setIsDeleting(true)
    setErrorMessage('')

    const { error } = await supabase.from('events').delete().eq('id', event.id)

    if (error) {
      console.error('Error deleting event:', error)

      setErrorMessage('Something went wrong while deleting the event.')

      setIsDeleting(false)
      return
    }

    navigate({
      to: '/overview',
    })
  }

  return (
    <div className="min-h-dvh bg-white">
      {/* HEADER */}
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
          aria-label="Go back"
        >
          <BackChevron className="h-6 w-6" />
        </button>

        <span className="text-base font-bold tracking-wide text-gray-900">
          EDIT EVENT
        </span>

        <div className="min-w-11" />
      </header>

      {/* FORM */}
      <main className="mx-auto w-full max-w-xl px-4 pb-40 pt-8">
        <div className="space-y-4">
          {/* Event name */}
          <div>
            <label htmlFor="event-name" className="sr-only">
              Event title
            </label>

            <input
              id="event-name"
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Event title"
              autoComplete="off"
              className="
                box-border
                h-14
                w-full
                min-w-0
                appearance-none
                rounded-2xl
                border
                border-gray-200
                bg-gray-50
                px-4
                text-base
                text-gray-900
                outline-none
                placeholder:text-gray-400
                focus:border-gray-900
                focus:bg-white
                focus:ring-4
                focus:ring-gray-900/5
              "
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="sr-only">
              Location
            </label>

            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              autoComplete="street-address"
              className="
                box-border
                h-14
                w-full
                min-w-0
                appearance-none
                rounded-2xl
                border
                border-gray-200
                bg-gray-50
                px-4
                text-base
                text-gray-900
                outline-none
                placeholder:text-gray-400
                focus:border-gray-900
                focus:bg-white
                focus:ring-4
                focus:ring-gray-900/5
              "
            />
          </div>

          {/* Date */}
          <div>
            <label htmlFor="event-date" className="sr-only">
              Event date
            </label>

            <input
              id="event-date"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="
                box-border
                h-14
                w-full
                min-w-0
                appearance-none
                rounded-2xl
                border
                border-gray-200
                bg-gray-50
                px-4
                text-base
                text-gray-900
                outline-none
                focus:border-gray-900
                focus:bg-white
                focus:ring-4
                focus:ring-gray-900/5
              "
            />
          </div>

          {/* Times */}
          <div className="grid grid-cols-2 gap-3">
            <div className="min-w-0">
              <label htmlFor="start-time" className="sr-only">
                Start time
              </label>

              <input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="
                  box-border
                  h-14
                  w-full
                  min-w-0
                  appearance-none
                  rounded-2xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-3
                  text-base
                  text-gray-900
                  outline-none
                  focus:border-gray-900
                  focus:bg-white
                  focus:ring-4
                  focus:ring-gray-900/5
                "
              />
            </div>

            <div className="min-w-0">
              <label htmlFor="end-time" className="sr-only">
                End time
              </label>

              <input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="
                  box-border
                  h-14
                  w-full
                  min-w-0
                  appearance-none
                  rounded-2xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-3
                  text-base
                  text-gray-900
                  outline-none
                  focus:border-gray-900
                  focus:bg-white
                  focus:ring-4
                  focus:ring-gray-900/5
                "
              />
            </div>
          </div>

          {/* Error */}
          {errorMessage && (
            <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          {/* Delete */}
          <button
            type="button"
            disabled={isDeleting || isSaving}
            onClick={handleDelete}
            className="
              mt-8
              h-12
              w-full
              rounded-2xl
              text-sm
              font-semibold
              text-red-500
              active:bg-red-50
              disabled:text-gray-300
            "
          >
            {isDeleting ? 'Deleting...' : 'Delete event'}
          </button>
        </div>
      </main>

      {/* SAVE */}
      <footer
        className="
          fixed
          inset-x-0
          bottom-0
          z-20
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
            disabled={!canSave || isSaving || isDeleting}
            onClick={handleSave}
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
              font-semibold
              text-white
              active:scale-[0.98]
              disabled:cursor-not-allowed
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
