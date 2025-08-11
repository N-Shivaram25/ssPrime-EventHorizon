import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";

export function getCalendarDays(date: Date) {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  return eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });
}

export function formatDateForApi(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function formatDateDisplay(date: Date): string {
  return format(date, "MMMM d, yyyy");
}

export function formatTimeDisplay(time: string): string {
  const [hours, minutes] = time.split(":");
  const hour12 = parseInt(hours) % 12 || 12;
  const ampm = parseInt(hours) >= 12 ? "PM" : "AM";
  return `${hour12}:${minutes} ${ampm}`;
}

export function getCurrentDate(): string {
  return formatDateForApi(new Date());
}
