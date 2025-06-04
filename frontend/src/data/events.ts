import type { Event as RBCEvent } from 'react-big-calendar'

const mockEvents: Record<string, RBCEvent[]> = {
  "tuition-class": [
    {
      title: "Math Class – Mr. Tan",
      start: new Date("2025-06-03T09:00:00+08:00"),
      end: new Date("2025-06-03T10:30:00+08:00"),
    },
    {
      title: "Science Class – Ms. Lim",
      start: new Date("2025-06-04T11:00:00+08:00"),
      end: new Date("2025-06-04T12:30:00+08:00"),
    },
  ],
  "salon-appointment": [
    {
      title: "Haircut – Alex",
      start: new Date("2025-07-03T14:00:00+08:00"),
      end: new Date("2025-07-03T14:45:00+08:00"),
    },
    {
      title: "Nail Treatment – Jamie",
      start: new Date("2025-07-03T15:00:00+08:00"),
      end: new Date("2025-07-03T16:00:00+08:00"),
    },
  ],
};

export default mockEvents