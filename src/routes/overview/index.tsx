import { createFileRoute, useRouter } from '@tanstack/react-router'

import { useEffect, useState } from 'react'
import Event from '../../components/event'
import EventModal from '../../components/event-modal'

export const Route = createFileRoute('/overview/')({
  component: Overview,
})

function Overview() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { navigate } = useRouter()
  const handleEdit = () => {
    setIsModalOpen(true)
  }

  return (
    <div className="flex flex-col min-h-dvh bg-gray-50">
      {/* TOP */}
      <header className="sticky top-0 z-20 h-16 border-b">
        <div className="w-full h-full flex items-center justify-center active:opacity-90">
          <span className="gradient-text font-extrabold text-xl">
            CONSCIOUS ACCESS
          </span>
        </div>
      </header>

      <EventModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      {/* SCROLLABLE CONTENT */}
      <main
        className="
      flex-1
      overflow-y-auto
      px-4
      py-5
      space-y-5
      pb-24
    "
      >
        <Event handleEdit={handleEdit} />
        <Event handleEdit={handleEdit} />
        <Event handleEdit={handleEdit} />
        <Event handleEdit={handleEdit} />
        <Event handleEdit={handleEdit} />
        <Event handleEdit={handleEdit} />
        <Event handleEdit={handleEdit} />
        <Event handleEdit={handleEdit} />
        <Event handleEdit={handleEdit} />
      </main>

      {/* BOTTOM ACTION */}
      <footer
        className="
    fixed
    bottom-0
    left-0
    right-0
    z-20
    bg-white
    border-t
  "
        style={{
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <button
          type="button"
          className="
      w-full
      h-16
      bg-black
      text-white
      font-bold
      text-lg
      active:scale-[0.98]
      cursor-pointer
    "
          onClick={() => navigate({ to: '/create-event' })}
        >
          CREATE EVENT
        </button>
      </footer>
    </div>
  )
}
