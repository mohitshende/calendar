import { useEffect, useRef } from "react";
import { isSameDay, isSameHour } from "../utils/utils";
import { HOUR_BOX_HEIGHT } from "./EventBox";

const CurrentTimeMarker = ({ date, hour }: { date: Date; hour: number }) => {
  const elementRef = useRef(null);

  const calculateOffset = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    return Math.floor((minutes / 60) * HOUR_BOX_HEIGHT);
  };

  const scrollToElement = () => {
    if (elementRef.current) {
      elementRef?.current?.scrollIntoView({
        behaviour: "smooth",
        block: "center",
      });
    }
  };

  useEffect(() => {
    scrollToElement();
  }, []);

  if (isSameDay(new Date(), date) && isSameHour(hour)) {
    return (
      <div
        className="flex items-center h-px bg-red-600"
        style={{ transform: `translateY(${calculateOffset()}px)` }}
        ref={elementRef}
      >
        <p className="bg-red-600 h-[12px] w-[12px] rounded-full -translate-x-full"></p>
      </div>
    );
  }

  return null;
};

export default CurrentTimeMarker;
