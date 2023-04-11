import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from 'date-fns';
import "./Calender.css"
function Calendar(props) {
 
  const { selectedDate, setSelectedDate } = props;
 
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleDateClick = (day) => {
    setSelectedDate(day.toISOString());
  };

  const handlePrevMonthClick = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonthClick = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
 
 

  const daysOfWeek = [ 'Sat','Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  return (
    <div className='calenderi'>
      <div class="step1">
      <button  class="step1b"> 1 </button>
      </div>
      <div className="month-header">
        <button className='btnback' onClick={handlePrevMonthClick}>{'<'}</button>
        <h2 className='datecal'>{format(currentMonth, 'MMMM yyyy')}</h2>
        <button className='btnback2' onClick={handleNextMonthClick}>{'>'}</button>
      </div>
      <div className="calendar">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-of-week">
            {day}
          </div>
        ))}
        {daysInMonth.map((day) => (
          <div
            key={day}
            className={`day ${selectedDate === day.toISOString() ? 'selected' : ''}`}
            onClick={() => handleDateClick(day)}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
      <p className='pasp'>{selectedDate ? `You selected ${format(new Date(selectedDate), 'MMMM d, yyyy')}.` : 'Please select a date.'}</p>
    </div>
  );
}

export default Calendar;
