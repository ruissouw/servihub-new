import { X, Pencil } from 'lucide-react' 
import type { BookingEvent } from '@/types'
import { useNavigate } from 'react-router-dom'

const EventView = ({ event, title, onMarkDelete }: { event: BookingEvent, title: string, onMarkDelete: (e: BookingEvent) => void }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between px-1">
      <span>{title}</span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => navigate(`/schedule/${event.id}`)}
          className="text-red-500 hover:text-red-700"
          title="Edit Booking"
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onMarkDelete(event)
          }}
          className="text-red-500 hover:text-red-700"
          title="Mark for deletion"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  )
}

export default EventView;
