import ThreeDots from '../icons/three-dots'

const Event = ({ handleEdit }: { handleEdit?: () => void }) => {
  return (
    <div
      style={{ boxShadow: '0px 1px 10px 2px rgba(0, 0, 0, 0.25)' }}
      className="event-box"
    >
      <div className="flex justify-between">
        <span className="text-black font-bold">EVENT A</span>
        <button type="button" onClick={handleEdit}>
          <ThreeDots style={{ width: '20px', height: '20px' }} />
        </button>
      </div>
      <div className="flex justify-between">
        <span className="event-box-subtitle">Lorem</span>
        <span className="event-box-subtitle">Berlin - 24 OCT</span>
      </div>
    </div>
  )
}

export default Event
