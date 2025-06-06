# ServiHub
ServiHub serves dozens of industries—tuition centres, salons, clinics, studios—each with
wildly different scheduling needs. It is a platform where clients can make bookings for services which can accept or reject their requests.

## Features
- Create a booking for a particular service
- View the status of your booking
- Cancel/update your booking
- Services can choose to accept or reject a booking
  
## Tech Stack
- React
- TypeScript
- TailwindCSS
- shadcn/ui
- Zustand
- pnpm

## Getting Started
Follow the steps below to get this project running on your local machine.

### Prerequisites
- Node.js (v18 or newer recommended)
- pnpm (v8 or newer recommended)
- Git
- A web browser

### Setup

1. **Clone the Repository**
   
- git clone https://github.com/ruissouw/servihub.git

- cd frontend

2. **Install dependencies**
   
- pnpm install

3. **Start the server**
   
- pnpm dev

## User Guide

### Login Page
- A mock login page to simulate the switching of personas
- Simply choose the persona you wish to simulate

### Booking Colours
- Red symbolizes that the customer's booking has been rejected
- White symbolizes that the customer's booking was cancelled by them
- Green symbolizes that the customer's booking was approved by the service
- Yellow symbolizes that the customer's booking is pending approval/rejection

### View Bookings (Customers)
- Able to view all bookings on the calendar
- Can toggle between the different calendar views
- Clicking on an event takes you to the "day" view
- Click the pencil icon (be precise) to edit the booking
- Click on the cross to cancel the event

### Edit View (Customers)
- Customers are taken to the same form page except with the fields pre filled in
- Simply drag and drop the desired date/timeslot
- Note that if the booking was approved before, it will be pending again

### Make Bookings (Customers)
- Firstly, select the service you wish to book
- Fill in ALL fields as required
- To select day/timeslot, click on a day (if in "monthly" view)
- Once in "weekly" or "day" view, you can drag to select your timeslot
- Note that for recurrent bookings, the timeslot you select will be the same for all sessions
- If you wish to make recurrent bookings with different timings, consider making several one-off bookings

### View Bookings (Businesses)
- Same with customers, click on an event to view it in detail
- For pending events (marked yellow), click on the green tick to approve the booking
- Else, click on the cross to reject the booking

### System Design
- Tailwind was used for the navbar
- React big calendar (RBC) was used for the calendar
- The booking form is a dynamic form based on a template specified by a service
- Services are able to specify the information they require based on their template fields
- The buttons are largely shadcn/ui tokens

### Future Updates

## Adding a new template via UI
- A section with a form can be added in which services can specify their requirements
- Not every template input needs to be asked for as some can be inferred
- For example, to generate a template ID, simply take the name of the service, convert all to small letters and add '-' in the white spaces

## Time Zone and Languages
- Add a drop-down which allows users to select their home country
- The time-zone switches accordinly and the language medium also changes automatically (though that can be toggled independently)

## Resource Collision
- Services can specify limited resources which will be kept in mind when a booking is made
- Automatically reject a booking if the resource is full

## Block Certain Timings
- It is unfeasible for a tuition centre to operate 24/7
- Services will be able to specify timings of their services

## Messaging System
- To improve clarity on why a booking is rejected/cancelled/rescheduled

## Priority Status
- Since some clients are more important/have more pressing needs than others
