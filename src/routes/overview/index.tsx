import { createFileRoute } from '@tanstack/react-router'

import { useEffect, useState } from 'react'
import Event from '../../components/event'
import EventModal from '../../components/event-modal'

export const Route = createFileRoute('/overview/')({
  component: Overview,
})

function Overview() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleEdit = () => {
    setIsModalOpen(true)
  }

  return (
    <div className="flex flex-col">
      <nav className="sticky top-0 h-16  z-10 bg-white overflow-y-hidden p-5 text-center">
        <span className="gradient-text font-extrabold text-xl">
          CONSCIOUS ACCESS
        </span>
      </nav>
      <EventModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className="flex flex-col overflow-y-auto p-5 gap-5 justify-center items-center">
        <Event handleEdit={handleEdit} />
        <Event handleEdit={handleEdit} />
        <Event handleEdit={handleEdit} />
        <Event handleEdit={handleEdit} />
        <Event handleEdit={handleEdit} />
        <Event handleEdit={handleEdit} />
        <Event handleEdit={handleEdit} />
        <Event handleEdit={handleEdit} />
        <Event handleEdit={handleEdit} />
      </div>
      <nav className="fixed bottom-0 h-16 z-10 bg-white overflow-y-hidden text-center flex justify-center items-center w-full">
        <button
          //   onClick={() => navigate('/create-event')}
          type="button"
          //   onClick={() => startTransition("/create-event")}
          className="text-black  font-extrabold text-xl border-2 rounded-2xl p-1.5"
        >
          CREATE EVENT
        </button>
      </nav>
    </div>
  )
}
