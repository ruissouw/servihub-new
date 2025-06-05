import type { BookingTemplate } from "@/types";

const bookingTemplates: BookingTemplate[] = [
    {
        id: 'tuition-class',
        label: 'Tuition Class',
        defaultColor: 'bg-sky-500',
        icon: 'book',
        fields: [
            {   
                id: 'subject', 
                label: 'Subject', 
                type: 'select',
                required: true,
                options: [
                    { value: 'Math', label: 'Math' },
                    { value: 'English', label: 'English' },
                    { value: 'Science', label: 'Science' },
                ],
            },
            { id: 'maxSlots', label: 'Max Slots', type: 'number', min: 1, max: 12, required: true },
            {   
                id: 'recurrenceType', 
                label: 'Recurrence Type', 
                type: 'select',
                required: true,
                options: [
                    { value: "ONE-OFF BOOKING", label: "One-off booking" },
                    { value: "DAILY", label: "Daily" },
                    { value: "WEEKLY", label: "Weekly" },
                    { value: "MONTHLY", label: "Monthly" },
                ],
            },
        ],
        recurrence: {
            allowed: true,
            defaultFreq: 'WEEKLY',
        }, 
        resources: ['Teacher'],
    },
    {
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
            { id: 'maxSlots', label: 'Max Slots', type: 'number', min: 1, max: 12, required: true },
            {   
                id: 'recurrenceType', 
                label: 'Recurrence Type', 
                type: 'select',
                required: true,
                options: [
                    { value: "ONE-OFF BOOKING", label: "One-off booking" },
                    { value: "DAILY", label: "Daily" },
                    { value: "WEEKLY", label: "Weekly" },
                    { value: "MONTHLY", label: "Monthly" },
                ],
            },
        ],
        recurrence: {
            allowed: true,
            defaultFreq: 'MONTHLY'
        }, 
        resources: ['Stylist'],
    }
];

export default bookingTemplates
