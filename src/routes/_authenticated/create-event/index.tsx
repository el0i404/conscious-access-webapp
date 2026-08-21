import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import BackChevron from '../../../icons/back-chevron'
import { supabase } from '#/lib/supabase'

export const Route = createFileRoute('/_authenticated/create-event/')({
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

  const canCreate =
    eventName.trim() && eventDate && startTime && location.trim()

  const handleCreateEvent = async () => {
    if (!canCreate || isCreating) return

    setIsCreating(true)

    const { data, error } = await supabase
      .from('events')
      .insert({
        event_name: eventName.trim(),
        location: location.trim(),
        // event_date: eventDate,
        // start_time: startTime,
        // end_time: endTime,
      })
      .select()
      .single()

    if (error) {
      console.error(error)
      setIsCreating(false)
      return
    }

    console.log('created event:', data)

    navigate({
      to: '/overview',
    })
  }

  return (
    <div className="min-h-dvh bg-white">
      {/* Header */}
      <header className="mx-auto flex h-16 w-full max-w-xl items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={() => navigate({ to: '/overview' })}
          className="
            flex
            min-h-11
            min-w-11
            items-center
            justify-center
            rounded-full
            transition
            active:scale-90
          "
          aria-label="Go back"
        >
          <BackChevron className="h-6 w-6" />
        </button>

        <span className="text-base font-bold tracking-wide text-gray-900">
          NEW EVENT
        </span>

        {/* Keeps title centered */}
        <div className="min-w-11" />
      </header>

      {/* Form */}
      <main className="mx-auto w-full max-w-xl px-4 pb-32 pt-8 sm:px-6 sm:pt-10">
        <div className="space-y-4">
          {/* Event name */}
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Event title"
            autoComplete="off"
            className="
              h-14
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              px-4
              text-base
              text-gray-900
              outline-none
              transition
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
              h-14
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              px-4
              text-base
              text-gray-900
              outline-none
              transition
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
                h-14
                w-full
                min-w-0
                rounded-2xl
                border
                border-gray-200
                bg-gray-50
                px-4
                text-base
                text-gray-900
                outline-none
                transition
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
                h-14
                w-full
                min-w-0
                rounded-2xl
                border
                border-gray-200
                bg-gray-50
                px-4
                text-base
                text-gray-900
                outline-none
                transition
                focus:border-gray-900
                focus:bg-white
                focus:ring-4
                focus:ring-gray-900/5
              "
            />
          </div>

          {/* Location */}
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            autoComplete="street-address"
            className="
              h-14
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              px-4
              text-base
              text-gray-900
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-gray-900
              focus:bg-white
              focus:ring-4
              focus:ring-gray-900/5
            "
          />
        </div>
      </main>

      {/* Bottom action */}
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
        <div className="mx-auto w-full max-w-xl p-4 sm:px-6">
          <button
            type="button"
            disabled={!canCreate || isCreating}
            onClick={handleCreateEvent}
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
              transition
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:bg-gray-200
              disabled:text-gray-400
              enabled:hover:bg-gray-800
            "
          >
            {isCreating ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </footer>
    </div>
  )
}
