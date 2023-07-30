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
