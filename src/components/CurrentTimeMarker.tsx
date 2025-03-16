import { isSameDay, isSameHour } from "../utils/utils";

const CurrentTimeMarker = ({ date, hour }: { date: Date; hour: number }) => {
  const calculateOffset = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    return Math.floor((minutes / 60) * 80);
  };

  if (isSameDay(new Date(), date) && isSameHour(hour)) {
    return (
      <div
        className="flex items-center h-px bg-red-600"
        style={{ transform: `translateY(${calculateOffset()}px)` }}
      >
        <p className="bg-red-600 h-[12px] w-[12px] rounded-full -translate-x-full"></p>
      </div>
    );
  }

  return null;
};

export default CurrentTimeMarker;
