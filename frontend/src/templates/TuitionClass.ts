import type { BookingTemplate } from '../types.ts';

const tuitionClass: BookingTemplate = {
  id: 'tuition-class',
  label: 'Tuition Class',
  defaultColor: 'bg-sky-500',
  icon: 'book',
  fields: [
    { id: 'subject', label: 'Subject', type: 'text', required: true },
    { id: 'maxSlots', label: 'Max Slots', type: 'number', min: 1, required: true },
  ],
  recurrence: {
    allowed: true,
    defaultFreq: 'WEEKLY',
  },
  resources: ['Teacher'],
};

export default tuitionClass;
