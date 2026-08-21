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

  component: Overview,
})

function Overview() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleEdit = () => {
    setIsModalOpen(true)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div
      className="
        flex
        min-h-screen
        flex-col
        bg-gray-50
        [min-height:100dvh]
      "
    >
      {/* HEADER */}
      <header
        className="
          shrink-0
          border-b
          border-gray-200
          bg-white
        "
        style={{
          paddingTop: 'env(safe-area-inset-top)',
        }}
      >
        <div
          className="
            flex
            h-16
            items-center
            justify-between
            px-4
          "
        >
          {/* Logout */}
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

          {/* Logo */}
          <span
            className="
              gradient-text
              text-[15px]
              font-extrabold
              tracking-tight
            "
          >
            CONSCIOUS ACCESS
          </span>

          {/* Keeps title centered */}
          <div className="h-11 min-w-11" />
        </div>
      </header>

      <EventModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      {/* SCROLLABLE CONTENT */}
      <main
        className="
          flex-1
          overflow-y-auto
          overscroll-contain
          px-4
          pt-5
        "
        style={{
          paddingBottom: 'calc(88px + env(safe-area-inset-bottom))',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="space-y-4">
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
      </main>

      {/* BOTTOM ACTION */}
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
        <div className="px-4 py-3">
          <button
            type="button"
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
              active:scale-[0.98]
            "
            onClick={() => navigate({ to: '/create-event' })}
          >
            CREATE EVENT
          </button>
        </div>
      </footer>
    </div>
  )
}
