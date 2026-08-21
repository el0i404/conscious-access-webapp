import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import Event from '../../../components/event'
import EventModal from '../../../components/event-modal'
import { supabase } from '#/lib/supabase'

export const Route = createFileRoute('/_authenticated/overview/')({
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

  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigate = useNavigate()

  const handleEdit = (event: (typeof events)[number]) => {
    console.log('edit event:', event)

    setIsModalOpen(true)
  }

  return (
    <main
      className="px-4 pt-5"
      style={{
        paddingBottom: 'calc(88px + env(safe-area-inset-bottom))',
      }}
    >
      {events.length === 0 ? (
        'Empty event'
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <Event key={event.id} event={event} />
          ))}
        </div>
      )}
    </main>
  )
}
