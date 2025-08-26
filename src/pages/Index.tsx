import React, { useState } from 'react';
import Calendar from '@/components/Calendar';
import AppointmentForm from '@/components/AppointmentForm';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Agenda tu cita
        </h1>
        
        <Calendar 
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
        
        <AppointmentForm selectedDate={selectedDate} />
      </div>
    </div>
  );
}
