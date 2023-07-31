import { calculateHourDifference } from "../utils/utils";
import { Event } from "./DayView";
import * as Tooltip from "@radix-ui/react-tooltip";

const EventBox = ({ event }: { event: Event }) => {
  const top = calculateHourDifference("12:00 AM", event.start_time);

  return (
    <Tooltip.Provider skipDelayDuration={50}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div
            key={event.id}
            className="bg-blue-200 p-1 rounded absolute w-[100%] border border-blue-400 truncate"
            style={{
              top: `${8 + top * 48}px`,
              height: `${
                calculateHourDifference(event.start_time, event.end_time) * 48
              }px`,
            }}
          >
            <span className="text-blue-600 ">{event.title}</span>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="TooltipContent z-50 bg-white shadow-md px-2 py-3 rounded-lg"
            sideOffset={5}
          >
            <p className="text-center">{event.title}</p>
            <p className="text-blue-600 ">
              From {event.start_time} to {event.end_time}
            </p>
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default EventBox;
