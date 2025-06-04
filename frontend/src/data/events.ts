import { v4 as uuidv4 } from 'uuid';
import type { BookingEvent } from '../types'; // Update path to where BookingEvent is defined

const mockBookingEvents: Record<string, BookingEvent[]> = {
  "tuition-class": [
    {
      id: uuidv4(),
      templateId: "tuition-class",
      start: new Date("2025-06-03T09:00:00+08:00"),
      end: new Date("2025-06-03T10:30:00+08:00"),
      status: 'approved',
      resourceIds: ['room-101'],
      customFields: {
        teacher: "Mr. Tan",
        subject: "Math",
      },
    },
    {
      id: uuidv4(),
      templateId: "tuition-class",
      start: new Date("2025-06-04T11:00:00+08:00"),
      end: new Date("2025-06-04T12:30:00+08:00"),
      status: 'approved',
      resourceIds: ['room-102'],
      customFields: {
        teacher: "Ms. Lim",
        subject: "Science",
      },
    },
  ],
  "salon-appointment": [
    {
      id: uuidv4(),
      templateId: "salon-appointment",
      start: new Date("2025-07-03T14:00:00+08:00"),
      end: new Date("2025-07-03T14:45:00+08:00"),
      status: 'approved',
      resourceIds: ['stylist-alex'],
      customFields: {
        service: "Haircut",
        stylist: "Alex",
      },
    },
    {
      id: uuidv4(),
      templateId: "salon-appointment",
      start: new Date("2025-07-03T15:00:00+08:00"),
      end: new Date("2025-07-03T16:00:00+08:00"),
      status: 'approved',
      resourceIds: ['stylist-jamie'],
      customFields: {
        service: "Nail Treatment",
        stylist: "Jamie",
      },
    },
  ],
};

export default mockBookingEvents;
