import { calculateHourDifference } from "../utils/utils";
import { Event } from "./DayView";
import * as Tooltip from "@radix-ui/react-tooltip";

const EventBox = ({ event }: { event: Event }) => {
  const top = calculateHourDifference("12:00 AM", event.start_time);

  function handleBooking() {
    //call an API to book the slot
    console.log("Booking API called with", event.user.name);
  }

  function handleWithdraw() {
    //call an API to withdraw from the booking
    console.log("Booking withdrawen with", event.user.name);
  }

  return (
    <Tooltip.Provider skipDelayDuration={50}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div
            key={event.id}
            className="bg-blue-200 flex flex-col gap-2 p-1 rounded absolute w-[100%] border border-blue-400 truncate"
            style={{
              top: `${8 + top * 80}px`,
              height: `${
                calculateHourDifference(event.start_time, event.end_time) * 80
              }px`,
            }}
          >
            <div className="flex gap-2">
              <span className="text-blue-600 text-sm">{event.title}</span>
              <p className="text-sm">{event.user.name}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleBooking}
                className=" bg-blue-500 text-white p-1 text-xs"
              >
                Book
              </button>

              <button
                onClick={handleWithdraw}
                className=" bg-red-500 text-white p-1 text-xs"
              >
                Withdraw
              </button>
            </div>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="TooltipContent z-50 bg-white shadow-md px-2 py-3 rounded-lg"
            sideOffset={5}
          >
            {/* <p className="text-center">{event.title}</p> */}
            <p className="text-sm">
              {" "}
              <b>Event organizer:</b> {event.user.name}
            </p>
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
