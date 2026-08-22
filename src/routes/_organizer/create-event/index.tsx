import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import BackChevron from '../../../icons/back-chevron'
import { supabase } from '#/lib/supabase'

export const Route = createFileRoute('/_organizer/create-event/')({
  component: CreateEvent,
})

function CreateEvent() {
  const navigate = useNavigate()

  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [location, setLocation] = useState('')

  const [isCreating, setIsCreating] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const canCreate = Boolean(
    eventName.trim() && eventDate && startTime && location.trim(),
  )

  const handleCreateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!canCreate || isCreating) return

    setIsCreating(true)
    setErrorMessage('')

    const { data, error } = await supabase
      .from('events')
      .insert({
        event_name: eventName.trim(),
        location: location.trim(),
        end_time: endTime,
        start_time: startTime,
        event_date: eventDate,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating event:', error)

      setErrorMessage('Something went wrong while creating the event.')

      setIsCreating(false)
      return
    }

    console.log('Created event:', data)

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
          aria-label="Go back"
        >
          <BackChevron className="h-6 w-6" />
        </button>

        <span className="text-base font-bold tracking-wide text-gray-900">
          NEW EVENT
        </span>

        <div className="min-w-11" />
      </header>

      {/* Form */}
      <main className="mx-auto w-full max-w-xl px-4 pb-32 pt-8">
        <form
          id="create-event-form"
          onSubmit={handleCreateEvent}
          className="space-y-4"
        >
          {/* Event name */}
          <input
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
              leading-none
              text-gray-900
              outline-none
              placeholder:text-gray-400
              focus:border-gray-900
              focus:bg-white
              focus:ring-4
              focus:ring-gray-900/5
            "
          />

          {/* Location */}
          <input
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
              leading-none
              text-gray-900
              outline-none
              placeholder:text-gray-400
              focus:border-gray-900
              focus:bg-white
              focus:ring-4
              focus:ring-gray-900/5
            "
          />

          {/* Date */}
          <input
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
              leading-none
              text-gray-900
              outline-none
              focus:border-gray-900
              focus:bg-white
              focus:ring-4
              focus:ring-gray-900/5
            "
          />

          {/* Time */}
          <div className="grid grid-cols-2 gap-3">
            <input
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

            <input
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

          {/* Error */}
          {errorMessage && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {errorMessage}
            </p>
          )}
        </form>
      </main>

      {/* Submit */}
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
            type="submit"
            form="create-event-form"
            disabled={!canCreate || isCreating}
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
            {isCreating ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </footer>
    </div>
  )
}
