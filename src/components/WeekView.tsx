import React, { useEffect, useState } from "react";
import DayView, { Event } from "./DayView";
import { fetchEventDataFromIndexedDB } from "../services/IndexedDBService";
import { formatHour } from "../utils/utils";
import useTick from "../hooks/useTick";

const WeekView: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    today.setDate(today.getDate() - dayOfWeek);
    return today;
  });

  const getCurrentMonth = (today: Date) => {
    const options = { month: "long", year: "numeric" };

    return today.toLocaleDateString(
      undefined,
      options as Intl.DateTimeFormatOptions
    );
  };

  const [currentMonthAndYear, setCurrentMonthAndYear] = useState(
    getCurrentMonth(new Date())
  );

  useEffect(() => {
    fetchEventDataFromIndexedDB().then((data) => {
      setEvents(data.calendar_events);
    });
  }, []);

  const handlePreviousWeek = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 7);
      setCurrentMonthAndYear(getCurrentMonth(newDate));
      return newDate;
    });
  };

  const handleNextWeek = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 7);
      setCurrentMonthAndYear(getCurrentMonth(newDate));
      return newDate;
    });
  };

  const weekDays = Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + index);
    return date;
  });

  const goToCurrentDate = () => {
    setCurrentDate(() => {
      const today = new Date();
      const dayOfWeek = today.getDay();

      today.setDate(today.getDate() - dayOfWeek);
      setCurrentMonthAndYear(getCurrentMonth(today));
      return today;
    });
  };

  useTick();

  return (
    <div className="mt-4 px-2 h-full">
      {/* <h1 className="text-2xl font-bold mb-6 text-center">
        Google Calendar Week View
      </h1> */}

      <div className="flex items-center flex-wrap gap-3 mb-30 border-b border-gray-200 pb-5">
        <button
          className="border border-gray-300 hover:bg-gray-100  font-semibold py-2 px-4 rounded"
          onClick={goToCurrentDate}
        >
          Today
        </button>
        <button
          className="border border-gray-300 hover:bg-gray-100  font-semibold py-2 px-4 rounded"
          onClick={handlePreviousWeek}
        >
          Previous Week
        </button>
        <button
          className="border border-gray-300 hover:bg-gray-100 font-semibold py-2 px-4 rounded"
          onClick={handleNextWeek}
        >
          Next Week
        </button>

        <h1 className="text-2xl font-semibold">{currentMonthAndYear}</h1>
      </div>

      <div className="h-24"></div>

      <div className="grid grid-cols-8 overflow-scroll">
        <div className="col-span-1">
          <div className=" p-2 rounded-t border-[1px] border-white invisible fixed z-40">
            <h3 className="text-xl">Hide this 23 July</h3>
          </div>
          <div className="grid pt-2 border-r">
            {Array.from({ length: 24 }).map((_, hour) => (
              <div key={hour} className="h-20 border-t border-gray-200">
                <span className="text-xs text-gray-500 ">
                  {formatHour(hour)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {weekDays.map((date, index) => (
          <DayView key={index} date={date} events={events} />
        ))}
      </div>
    </div>
  );
};

export default WeekView;
