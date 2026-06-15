import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Field, Label } from '../../components/fieldset'
import { Input } from '../../components/input'
import BackChevron from '../../icons/back-chevron'

export const Route = createFileRoute('/create-event/')({
  component: createEvent,
})

function createEvent() {
  const [isModalOpen, setIsModalOpen] = useState(true)

  return (
    <div className="min-h-dvh  flex flex-col ">
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-4 pb-6">
        <a href="/overview" className="p-2">
          <BackChevron className="w-6 h-6" />
        </a>

        <span className="font-bold text-xl">NEW EVENT</span>

        {/* spacer for centering title */}
        <div className="w-10" />
      </header>

      {/* Form */}
      <main className="flex-1 ">
        <form className="flex flex-col gap-4 w-full">
          <input
            placeholder="Event title"
            className="w-full rounded-2xl border p-4 text-base"
          />

          <input type="date" className=" rounded-2xl border p-4 text-base" />

          <div className="grid grid-cols-2 gap-3">
            <input type="time" className="rounded-2xl border p-4 text-base" />

            <input type="time" className="rounded-2xl border p-4 text-base" />
          </div>

          <input
            placeholder="Location"
            className="w-full rounded-2xl border p-4 text-base"
          />
        </form>
      </main>

      {/* Sticky bottom button */}
      <footer className="p-4">
        <button
          type="button"
          className="
        w-full
        bg-black
        text-white
        p-4
        rounded-2xl
        text-lg
        active:scale-[0.98]
        cursor-pointer
      "
          onClick={() => navigate({ to: '/create-event' })}
        >
          Create Event
        </button>
      </footer>
    </div>
  )
}
