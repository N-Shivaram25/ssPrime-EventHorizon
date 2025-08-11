import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, isToday, isSameMonth } from "date-fns";
import { Clock, Calendar } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Event } from "@shared/schema";

interface FlipCardDateProps {
  date: Date;
  dateStr: string;
  events: Event[];
  isCurrentMonth: boolean;
  onClick: (dateStr: string, event: React.MouseEvent) => void;
  onEventClick: (event: Event, mouseEvent: React.MouseEvent) => void;
}

const eventColors = {
  "#3B82F6": "bg-blue-500 text-white",
  "#EF4444": "bg-red-500 text-white",
  "#10B981": "bg-green-500 text-white",
  "#F59E0B": "bg-amber-500 text-white",
};

export default function FlipCardDate({
  date,
  dateStr,
  events,
  isCurrentMonth,
  onClick,
  onEventClick,
}: FlipCardDateProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const dayNumber = format(date, "d");
  const isCurrentDay = isToday(date);

  const handleClick = (e: React.MouseEvent) => {
    if (events.length > 0) {
      setIsFlipped(!isFlipped);
    } else {
      onClick(dateStr, e);
    }
  };

  const formatTime = (time: string | null) => {
    if (!time) return null;
    const [hours, minutes] = time.split(":");
    const hour12 = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) >= 12 ? "PM" : "AM";
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <motion.div
      className={cn(
        "flip-card min-h-[120px] cursor-pointer calendar-cell liquid-transition",
        !isCurrentMonth && "bg-muted/20",
        isCurrentDay && "current-date",
        isFlipped && "flipped"
      )}
      onClick={handleClick}
      data-testid={`calendar-day-${dateStr}`}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flip-card-inner">
        {/* Front Side - Date */}
        <div className="flip-card-front p-3">
          <span
            className={cn(
              "text-sm font-medium block mb-3",
              isCurrentMonth ? "text-foreground" : "text-muted-foreground",
              isCurrentDay && "inline-flex items-center justify-center w-8 h-8 text-white bg-primary rounded-full font-semibold"
            )}
          >
            {dayNumber}
          </span>

          {/* Event Indicators - Show colored dots for max 3 events */}
          <div className="space-y-1">
            {events.length > 0 && (
              <TooltipProvider>
                <div className="flex flex-wrap gap-1 mb-2">
                  {events.slice(0, 3).map((event, index) => (
                    <Tooltip key={event.id}>
                      <TooltipTrigger asChild>
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="event-dot cursor-pointer hover:scale-125 liquid-transition"
                          style={{ backgroundColor: event.color }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick(event, e);
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{event.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                  {events.length > 3 && (
                    <span className="text-xs text-muted-foreground ml-1">
                      +{events.length - 3}
                    </span>
                  )}
                </div>
              </TooltipProvider>
            )}
            
            {/* First event title preview */}
            {events.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-muted-foreground truncate"
              >
                {events[0].title}
              </motion.div>
            )}
          </div>
        </div>

        {/* Back Side - Event Details */}
        <div className="flip-card-back p-2 neumorphic">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">
              {dayNumber}
            </span>
            <Calendar className="w-4 h-4 text-primary" />
          </div>

          <div className="space-y-2 max-h-[90px] overflow-y-auto">
            {events.map((event) => {
              const startTime = formatTime(event.startTime);
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs p-2 rounded glass border border-white/20 cursor-pointer hover:bg-white/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event, e);
                  }}
                >
                  <div className="font-medium text-white/90 mb-1">
                    {event.title}
                  </div>
                  {startTime && (
                    <div className="flex items-center text-white/70">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{startTime}</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.button
            className="mt-2 text-xs text-primary hover:text-primary/80 font-medium"
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(false);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Close
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}