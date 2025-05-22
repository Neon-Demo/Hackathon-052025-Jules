"use client";

import React from 'react';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addDays, addMonths, startOfDay, endOfDay } from 'date-fns';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface MyEvent extends Event {
  title?: string; // Make title optional as per Event interface, but we will always provide it.
}

const today = new Date();
const nextWeek = addDays(today, 7);
const nextMonth = addMonths(today, 1);

const events: MyEvent[] = [
  {
    title: 'Project Alpha - Site Visit',
    start: startOfDay(nextWeek),
    end: endOfDay(nextWeek),
    allDay: true,
  },
  {
    title: 'Project Beta - Client Meeting',
    start: startOfDay(addDays(nextMonth, 3)), // A few days into next month
    end: endOfDay(addDays(nextMonth, 3)),
    allDay: true,
  },
  {
    title: 'Team Stand-up Meeting',
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0, 0), // Today at 9:00 AM
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30, 0),   // Today at 9:30 AM
  },
  {
    title: 'Deadline: Phase 1 Report',
    start: startOfDay(addDays(today, 10)), // 10 days from now
    end: endOfDay(addDays(today, 10)),
    allDay: true,
  },
];

export default function ProjectCalendarPage() {
  return (
    <div className="p-4 md:p-6 h-full flex flex-col">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Project Calendar
      </h1>
      <div className="flex-grow bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 12rem)' }} // Adjusted height for better fit
          className="text-gray-700 dark:text-gray-200"
        />
      </div>
    </div>
  );
}
