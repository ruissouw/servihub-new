import { X } from 'lucide-react' 
import type { BookingEvent } from '@/types'

const EventView = ({ event, title, onMarkDelete }: { event: BookingEvent, title: string, onMarkDelete: (e: BookingEvent) => void }) => {
  return (
    <div className="flex items-center justify-between gap-1 px-1">
      <span>{title}</span>
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
  )
}

export default EventView;
