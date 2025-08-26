import React, { useState } from 'react';
import { CustomButton } from './CustomButton';

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7)); 
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    
   
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
 
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate || !date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const renderMonth = (monthOffset: number = 0) => {
    const displayDate = new Date(currentDate);
    displayDate.setMonth(currentDate.getMonth() + monthOffset);
    const days = getDaysInMonth(displayDate);

    return (
      <div className="flex-1">
        <div className="text-center font-medium mb-4">
          {monthNames[displayDate.getMonth()]} {displayDate.getFullYear()}
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div key={index} className="aspect-square">
              {day && (
                <CustomButton
                  variant={isDateSelected(day) ? 'primary' : 'ghost'}
                  className="w-full h-full text-sm"
                  onClick={() => onDateSelect(day)}
                >
                  {day.getDate()}
                </CustomButton>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <CustomButton
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('prev')}
            className="p-2"
          >
            ←
          </CustomButton>
          <div className="flex space-x-8">
            {renderMonth(0)}
            {renderMonth(1)}
          </div>
          <CustomButton
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('next')}
            className="p-2"
          >
            →
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Calendar;