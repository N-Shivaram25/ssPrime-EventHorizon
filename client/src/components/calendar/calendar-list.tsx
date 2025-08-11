import { motion } from "framer-motion";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText } from "lucide-react";
import type { Event } from "@shared/schema";
import { cn } from "@/lib/utils";

interface CalendarListProps {
  currentDate: Date;
  events: Event[];
  isLoading: boolean;
  onEventClick: (event: Event, mouseEvent: React.MouseEvent) => void;
}

const eventColors = {
  "#3B82F6": "bg-blue-500 text-white",
  "#EF4444": "bg-red-500 text-white",
  "#10B981": "bg-green-500 text-white",
  "#F59E0B": "bg-amber-500 text-white",
};

export default function CalendarList({
  currentDate,
  events,
  isLoading,
  onEventClick,
}: CalendarListProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    const date = event.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  // Get all dates with events or important dates
  const relevantDates = daysInMonth.filter(date => {
    const dateStr = format(date, "yyyy-MM-dd");
    return eventsByDate[dateStr] || isToday(date);
  });

  const formatTime = (time: string | null) => {
    if (!time) return null;
    const [hours, minutes] = time.split(":");
    const hour12 = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) >= 12 ? "PM" : "AM";
    return `${hour12}:${minutes} ${ampm}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }, (_, i) => (
          <Card key={i} className="p-4">
            <div className="animate-pulse">
              <div className="h-4 w-32 bg-muted rounded mb-3"></div>
              <div className="space-y-2">
                <div className="h-6 w-3/4 bg-muted rounded"></div>
                <div className="h-4 w-1/2 bg-muted rounded"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (relevantDates.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center py-16"
      >
        <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No events this month</h3>
        <p className="text-muted-foreground">Create your first event to get started</p>
      </motion.div>
    );
  }

  return (
    <ParallaxProvider>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {relevantDates.map((date, dateIndex) => {
          const dateStr = format(date, "yyyy-MM-dd");
          const dayEvents = eventsByDate[dateStr] || [];
          const isCurrentDay = isToday(date);

          return (
            <motion.div
              key={dateStr}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dateIndex * 0.05 }}
            >
              {/* Date Header with Parallax */}
              <Parallax speed={-5}>
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className={cn(
                      "flex flex-col items-center justify-center w-16 h-16 rounded-xl border neumorphic",
                      isCurrentDay
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border"
                    )}
                  >
                    <span className="text-xs font-medium uppercase">
                      {format(date, "MMM")}
                    </span>
                    <span className="text-lg font-bold">
                      {format(date, "d")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {format(date, "EEEE, MMMM d")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {dayEvents.length === 0 ? "No events" : `${dayEvents.length} event${dayEvents.length !== 1 ? 's' : ''}`}
                    </p>
                  </div>
                </div>
              </Parallax>

              {/* Events List with Parallax */}
              {dayEvents.length > 0 && (
                <Parallax speed={-2}>
                  <div className="space-y-3 ml-16">
                    {dayEvents.map((event, eventIndex) => {
                      const startTime = formatTime(event.startTime);
                      const endTime = formatTime(event.endTime);
                      const timeRange = startTime && endTime
                        ? `${startTime} - ${endTime}`
                        : startTime
                        ? startTime
                        : "All day";

                      return (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: eventIndex * 0.05 }}
                        >
                          <Card
                            className="cursor-pointer glass hover:shadow-md liquid-transition hover:scale-[1.02] border-l-4"
                            style={{ borderLeftColor: event.color }}
                            onClick={(e) => onEventClick(event, e)}
                            data-testid={`list-event-card-${event.id}`}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Badge
                                      className={cn(
                                        "text-xs font-medium neumorphic",
                                        eventColors[event.color as keyof typeof eventColors] || "bg-primary text-white"
                                      )}
                                    >
                                      {event.title}
                                    </Badge>
                                  </div>
                                  
                                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                                    <Clock className="w-4 h-4 mr-2" />
                                    <span>{timeRange}</span>
                                  </div>
                                  
                                  {event.description && (
                                    <div className="flex items-start text-sm text-muted-foreground">
                                      <FileText className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                      <span className="break-words">{event.description}</span>
                                    </div>
                                  )}
                                </div>
                                
                                <div
                                  className={cn(
                                    "w-3 h-3 rounded-full flex-shrink-0 ml-3",
                                    eventColors[event.color as keyof typeof eventColors]?.replace("text-white", "") || "bg-primary"
                                  )}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </Parallax>
              )}
              
              {dateIndex < relevantDates.length - 1 && (
                <Separator className="mt-6" />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </ParallaxProvider>
  );
}