import { useNavigate } from '@tanstack/react-router'
import ThreeDots from '../icons/three-dots'

type EventProps = {
  event: {
    id: string
    event_name: string
    location: string
    created_at: string
  }
}

const Event = ({ event }: EventProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate({
      to: '/overview/$eventId',
      params: {
        eventId: event.id,
      },
    })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="
        w-full
        rounded-2xl
        bg-white
        p-4
        text-left
        active:scale-[0.99]
      "
      style={{
        boxShadow: '0px 1px 10px 2px rgba(0, 0, 0, 0.12)',
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="min-w-0 truncate text-base font-bold text-black">
          {event.event_name}
        </span>

        <ThreeDots
          style={{
            width: '20px',
            height: '20px',
          }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="truncate text-sm text-gray-500">{event.location}</span>

        <span className="shrink-0 text-sm text-gray-500">
          {new Date(event.created_at).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
          })}
        </span>
      </div>
    </button>
  )
}

export default Event
