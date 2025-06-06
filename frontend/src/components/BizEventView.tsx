import { X, TicketCheck } from 'lucide-react' 
import type { BookingEvent } from '@/types'
import { useNavigate } from 'react-router-dom'

type BizEventViewProps = {
  event: BookingEvent;
  title: string;
  onMarkApprove: (event: BookingEvent) => void;
  onMarkReject: (event: BookingEvent) => void;
};

const BizEventView = ({
  event,
  title,
  onMarkApprove,
  onMarkReject,
}: BizEventViewProps) => {
    const navigate = useNavigate();

    return (
        <>
                <div className="flex items-center justify-between px-1">
                    <span>{title}</span>
                    {event.status === "pending" && (
                        <div className="flex items-center gap-1">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onMarkApprove(event);
                                }}
                                className="text-green-500 hover:text-green-700"
                                title="Mark for approval"
                            >
                                <TicketCheck size={15} />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onMarkReject(event);
                                }}
                                className="text-red-500 hover:text-red-700"
                                title="Mark for rejection"
                            >
                                <X size={15} />
                            </button>
                        </div>
                    )}
                </div>
        </>
    )
}

export default BizEventView;
