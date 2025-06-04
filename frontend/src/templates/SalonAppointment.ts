import type { BookingTemplate } from '../types.ts';

const salonAppointment: BookingTemplate = {
  id: 'salon-appointment',
  label: 'Salon Appointment',
  defaultColor: 'bg-pink-500',
  icon: 'scissors',
  fields: [
    {
      id: 'serviceType',
      label: 'Service Type',
      type: 'select',
      required: true,
      options: [
        { value: 'hair', label: 'Hair' },
        { value: 'nails', label: 'Nails' },
        { value: 'facial', label: 'Facial' },
      ],
    },
    { id: 'stylist', label: 'Preferred Stylist', type: 'text' },
  ],
  resources: ['Stylist'],
};

export default salonAppointment;
