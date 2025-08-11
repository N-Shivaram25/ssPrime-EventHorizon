import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CalendarHeader from "@/components/calendar/calendar-header";
import CalendarGrid from "@/components/calendar/calendar-grid";
import CalendarList from "@/components/calendar/calendar-list";
import EventModal from "@/components/calendar/event-modal";
import EventPopover from "@/components/calendar/event-popover";
import { useEvents } from "@/hooks/use-events";
import { useTheme } from "@/hooks/use-theme";
import { format, startOfMonth, endOfMonth } from "date-fns";
import type { Event } from "@shared/schema";

export type ViewMode = "grid" | "list";

export default function Calendar() {
  const { theme, toggleTheme } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [popoverEvent, setPopoverEvent] = useState<Event | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{ x: number; y: number } | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const { data: events = [], isLoading } = useEvents(year, month);

  const handleDateClick = (date: string, event: React.MouseEvent) => {
    const dayEvents = events.filter(e => e.date === date);
    if (dayEvents.length > 0) {
      // Show popover for first event
      setPopoverEvent(dayEvents[0]);
      setPopoverPosition({ x: event.clientX, y: event.clientY });
    } else {
      // Open event modal for creating new event
      setSelectedDate(date);
      setIsEventModalOpen(true);
    }
  };

  const handleEventClick = (event: Event, mouseEvent: React.MouseEvent) => {
    mouseEvent.stopPropagation();
    setPopoverEvent(event);
    setPopoverPosition({ x: mouseEvent.clientX, y: mouseEvent.clientY });
  };

  const handleAddEvent = () => {
    setSelectedDate(format(new Date(), "yyyy-MM-dd"));
    setEditingEvent(null);
    setIsEventModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setSelectedDate(event.date);
    setIsEventModalOpen(true);
    setPopoverEvent(null);
  };

  const handleCloseModal = () => {
    setIsEventModalOpen(false);
    setEditingEvent(null);
    setSelectedDate(null);
  };

  const handleClosePopover = () => {
    setPopoverEvent(null);
    setPopoverPosition(null);
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(year, month - 2));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <CalendarHeader
        theme={theme}
        viewMode={viewMode}
        currentDate={currentDate}
        onThemeToggle={toggleTheme}
        onViewModeChange={setViewMode}
        onAddEvent={handleAddEvent}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />

      <main className="flex-1 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {viewMode === "grid" ? (
                <CalendarGrid
                  currentDate={currentDate}
                  events={events}
                  isLoading={isLoading}
                  onDateClick={handleDateClick}
                  onEventClick={handleEventClick}
                />
              ) : (
                <CalendarList
                  currentDate={currentDate}
                  events={events}
                  isLoading={isLoading}
                  onEventClick={handleEventClick}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {isEventModalOpen && (
          <EventModal
            isOpen={isEventModalOpen}
            selectedDate={selectedDate}
            editingEvent={editingEvent}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {popoverEvent && popoverPosition && (
          <EventPopover
            event={popoverEvent}
            position={popoverPosition}
            onClose={handleClosePopover}
            onEdit={handleEditEvent}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
