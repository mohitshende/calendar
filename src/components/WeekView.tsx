import React, { useEffect, useState } from "react";
import DayView, { Event } from "./DayView";
import {
  fetchEventDataFromIndexedDB,
  populateIndexedDBWithEvents,
} from "../services/IndexedDBService";
import { formatHour, getNextSunday } from "../utils/utils";
import useTick from "../hooks/useTick";

const WeekView: React.FC = () => {
  const [loading, setLoading] = useState(true);

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
    populateIndexedDBWithEvents([
      {
        id: 1,
        title: "History Study Session",
        date: getNextSunday(currentDate),
        start_time: "01:00 PM",
        end_time: "01:25 PM",
        user: {
          name: "Mack",
        },
      },
      {
        id: 2,
        title: "Study Session",
        date: getNextSunday(currentDate),
        start_time: "03:00 PM",
        end_time: "03:50 PM",
        user: {
          name: "Mohit",
        },
      },
      {
        id: 3,
        title: "Study Session",
        date: getNextSunday(currentDate),
        start_time: "07:00 PM",
        end_time: "08:15 PM",
        user: {
          name: "Kate",
        },
      },
    ])
      .then(() => {
        console.log("IndexedDB populated with events data.");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error populating IndexedDB:", error);
        setLoading(false);
      });
  }, [currentDate]);

  useEffect(() => {
    fetchEventDataFromIndexedDB().then((data) => {
      setEvents(data.calendar_events);
    });
  }, [currentDate]);

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

  const [selectedTimeframe, setSelectedTimeframe] = useState("All");

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="mt-4 px-2 h-full">
      {/* <h1 className="text-2xl font-bold mb-6 text-center">
        Google Calendar Week View
      </h1> */}

      <div className="h-20 fixed w-screen top-0 bg-white z-40 flex items-center flex-wrap gap-3 mb-30 border-b border-gray-200 pb-5">
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

        <div className="flex gap-4 border border-gray-300 rounded overflow-hidden cursor-pointer ml-20">
          <div
            className={`${
              selectedTimeframe === "All" ? "bg-blue-500 text-white" : ""
            } py-2 px-4`}
            onClick={() => setSelectedTimeframe("All")}
          >
            All
          </div>
          <div
            className={`${
              selectedTimeframe === "25" ? "bg-blue-500 text-white" : ""
            } py-2 px-4`}
            onClick={() => setSelectedTimeframe("25")}
          >
            25m
          </div>
          <div
            className={`${
              selectedTimeframe === "50" ? "bg-blue-500 text-white" : ""
            } py-2 px-4`}
            onClick={() => setSelectedTimeframe("50")}
          >
            50m
          </div>
          <div
            className={`${
              selectedTimeframe === "75" ? "bg-blue-500 text-white" : ""
            } py-2 px-4`}
            onClick={() => setSelectedTimeframe("75")}
          >
            75m
          </div>
        </div>
      </div>

      <div
        className="h-20 fixed w-screen bg-white z-40 top-20
      border-b border-gray-200
      "
      ></div>

      <div className="grid grid-cols-8 overflow-scroll mt-40">
        <div className="col-span-1">
          <div className="grid pt-2 border-r">
            {Array.from({ length: 24 }).map((_, hour) => (
              <div key={hour} className="h-40 border-t border-gray-200">
                <span className="text-xs text-black bg-white relative top-[-15px] z-30">
                  {formatHour(hour)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {weekDays.map((date, index) => (
          <DayView key={index} date={date} events={events} selectedTimeframe={selectedTimeframe} />
        ))}
      </div>
    </div>
  );
};

export default WeekView;
