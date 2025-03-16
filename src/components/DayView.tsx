import React from "react";
import { formatDate, getDay, getHourFromTime, isSameDay } from "../utils/utils";
import Event from "./EventBox";
import EventBox from "./EventBox";
import CurrentTimeMarker from "./CurrentTimeMarker";

export interface Event {
  id: number;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
}

interface DayViewProps {
  date: Date;
  events: Event[];
}

const DayView: React.FC<DayViewProps> = ({ date, events }) => {
  const dayEvents = events.filter((event) =>
    isSameDay(new Date(event.date), date)
  );

  const hourParser = (hour: number) => {
    if (hour < 12) {
      return { hour: hour == 0 ? 12 : hour, ampm: "AM" };
    } else {
      return { hour: hour, ampm: "PM" };
    }
  };

  return (
    <div className="flex flex-col items-center col-span-1 rounded">
      <div className="flex flex-col items-center justify-center bg-white p-2 rounded-t border-[1px] border-white absolute z-40 -translate-y-full">
        <p
          style={{
            color: isSameDay(new Date(), date) ? "#1a73e8" : "black",
          }}
        >
          {formatDate(date).slice(0, 3).toUpperCase()}
        </p>
        <div
          className="flex items-center justify-center h-9 w-9 rounded-full"
          style={{
            background: isSameDay(new Date(), date) ? "#1a73e8" : "white",
            color: isSameDay(new Date(), date) ? "white" : "black",
          }}
        >
          {getDay(date)}
        </div>
      </div>
      <div className="w-full grid pt-2 border-r relative">
        {Array.from({ length: 24 }).map((_, hour) => (
          <div key={hour} className="border-t border-gray-200 h-20">
            <CurrentTimeMarker date={date} hour={hour} />
            {dayEvents
              .filter((event) => {
                return (
                  getHourFromTime(event.start_time).hour <=
                    hourParser(hour).hour &&
                  getHourFromTime(event.start_time).ampm ===
                    hourParser(hour).ampm
                );
              })
              .map((event) => {
                return <EventBox key={event.id} event={event} />;
              })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayView;
