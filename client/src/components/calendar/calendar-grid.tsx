import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isToday } from "date-fns";
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
          const dayNumber = format(day, "d");
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day);

          return (
            <motion.div
              key={dateStr}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.01 }}
              className={cn(
                "min-h-[120px] p-2 cursor-pointer transition-all duration-200 hover:bg-muted/50 hover:scale-[1.02] border-b border-border",
                !isCurrentMonth && "bg-muted/20"
              )}
              onClick={(e) => onDateClick(dateStr, e)}
              data-testid={`calendar-day-${dateStr}`}
            >
              <span
                className={cn(
                  "text-sm font-medium",
                  isCurrentMonth ? "text-foreground" : "text-muted-foreground",
                  isCurrentDay && "inline-flex items-center justify-center w-8 h-8 text-white bg-primary rounded-full font-semibold"
                )}
              >
                {dayNumber}
              </span>

              {/* Events */}
              <div className="mt-1 space-y-1">
                {dayEvents.slice(0, 3).map((event, eventIndex) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: eventIndex * 0.1 }}
                    className={cn(
                      "text-xs px-2 py-1 rounded-md font-medium truncate cursor-pointer hover:opacity-80 transition-opacity",
                      eventColors[event.color as keyof typeof eventColors] || "bg-primary text-white"
                    )}
                    onClick={(e) => onEventClick(event, e)}
                    data-testid={`event-card-${event.id}`}
                  >
                    {event.title}
                  </motion.div>
                ))}
                
                {dayEvents.length > 3 && (
                  <div className="text-xs text-muted-foreground font-medium px-2">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
