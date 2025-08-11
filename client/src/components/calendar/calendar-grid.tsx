import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isToday } from "date-fns";
import FlipCardDate from "@/components/calendar/flip-card-date";
import type { Event } from "@shared/schema";
import { cn } from "@/lib/utils";

interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  isLoading: boolean;
  onDateClick: (date: string, event: React.MouseEvent) => void;
  onEventClick: (event: Event, mouseEvent: React.MouseEvent) => void;
}

const eventColors = {
  "#3B82F6": "bg-primary text-white",
  "#EF4444": "bg-red-500 text-white",
  "#10B981": "bg-green-500 text-white",
  "#F59E0B": "bg-amber-500 text-white",
};

export default function CalendarGrid({
  currentDate,
  events,
  isLoading,
  onDateClick,
  onEventClick,
}: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const getEventsForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return events.filter(event => event.date === dateStr);
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-border bg-muted">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="px-4 py-3 text-sm font-medium text-muted-foreground text-center">
              {day}
            </div>
          ))}
        </div>

        {/* Loading skeleton */}
        <div className="grid grid-cols-7 divide-x divide-border">
          {Array.from({ length: 42 }, (_, i) => (
            <div key={i} className="min-h-[120px] p-2 border-b border-border">
              <Skeleton className="h-4 w-4 mb-2" />
              <Skeleton className="h-6 w-full mb-1" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-xl shadow-sm border border-border overflow-hidden"
    >
      {/* Days of Week Header */}
      <div className="grid grid-cols-7 border-b border-border bg-muted">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="px-4 py-3 text-sm font-medium text-muted-foreground text-center">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 divide-x divide-border">
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const dateStr = format(day, "yyyy-MM-dd");
          const isCurrentMonth = isSameMonth(day, currentDate);

          return (
            <motion.div
              key={dateStr}
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ 
                delay: index * 0.02,
                duration: 0.5,
                ease: "easeOut"
              }}
            >
              <FlipCardDate
                date={day}
                dateStr={dateStr}
                events={dayEvents}
                isCurrentMonth={isCurrentMonth}
                onClick={onDateClick}
                onEventClick={onEventClick}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
