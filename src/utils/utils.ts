// Utility function to add days to a date
export function addDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

// Utility function to check if two dates are the same day
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function isSameHour(hour: number) {
  const now = new Date();
  return hour === now.getHours();
}

// Utility function to format date in a desired format
export function formatDate(date: Date): string {
  const options = { weekday: "long", month: "long", day: "numeric" };
  return date.toLocaleDateString(
    undefined,
    options as Intl.DateTimeFormatOptions
  );
}

export function getDay(date: Date): string {
  const options = { day: "numeric" };
  return date.toLocaleDateString(
    undefined,
    options as Intl.DateTimeFormatOptions
  );
}

export function formatHour(hour: number): string {
  if (hour === 0) {
    return "12 AM";
  } else if (hour < 12) {
    return `${hour} AM`;
  } else if (hour === 12) {
    return "12 PM";
  } else {
    return `${hour - 12} PM`;
  }
}

export function formatTime(time: string): string {
  const [hour, minute] = time.split(":");
  const hourString = hour.length === 1 ? `0${hour}` : hour;
  const minuteString = minute.length === 1 ? `0${minute}` : minute;
  return `${hourString}:${minuteString}`;
}

export function getHourFromTime(time: string): { hour: number; ampm: string } {
  const [hourString, ampm] = time.split(" ");

  const hour = parseInt(hourString, 10);

  return { hour, ampm };
}

export function getMinuteFromTime(time: string): number {
  return parseInt(time.split(":")[1], 10);
}

export function calculateHourDifference(startTime: string, endTime: string) {
  const [startHour, startMinutes, startMeridiem] = startTime.split(/:|\s/);
  const [endHour, endMinutes, endMeridiem] = endTime.split(/:|\s/);

  let start = new Date(
    2000,
    0,
    1,
    parseInt(startHour),
    parseInt(startMinutes),
    0,
    0
  );
  let end = new Date(2000, 0, 1, parseInt(endHour), parseInt(endMinutes), 0, 0);

  if (startMeridiem.toLowerCase() === "pm" && startHour !== "12") {
    start.setHours(start.getHours() + 12);
  } else if (startMeridiem.toLowerCase() === "am" && startHour === "12") {
    start.setHours(0);
  }

  if (endMeridiem.toLowerCase() === "pm" && endHour !== "12") {
    end.setHours(end.getHours() + 12);
  } else if (endMeridiem.toLowerCase() === "am" && endHour === "12") {
    end.setHours(0);
  }

  const timeDifference = Number(end) - Number(start);
  const hoursDifference = timeDifference / (1000 * 60 * 60);

  return hoursDifference;
}
