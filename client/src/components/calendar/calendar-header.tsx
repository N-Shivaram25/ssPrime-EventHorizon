import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus, Moon, Sun, Calendar, List } from "lucide-react";
import { format } from "date-fns";
import GradientTimeIndicator from "@/components/ui/gradient-time-indicator";
import { useConfetti } from "@/hooks/use-confetti";
import type { ViewMode } from "@/pages/calendar";

interface CalendarHeaderProps {
  theme: "light" | "dark";
  viewMode: ViewMode;
  currentDate: Date;
  onThemeToggle: () => void;
  onViewModeChange: (mode: ViewMode) => void;
  onAddEvent: () => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

interface MousePosition {
  x: number;
  y: number;
}

export default function CalendarHeader({
  theme,
  viewMode,
  currentDate,
  onThemeToggle,
  onViewModeChange,
  onAddEvent,
  onPreviousMonth,
  onNextMonth,
  onToday,
}: CalendarHeaderProps) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 50, y: 50 });
  const { triggerThemeChange } = useConfetti();

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleThemeToggle = () => {
    triggerThemeChange();
    onThemeToggle();
  };

  return (
    <header 
      className="bg-background border-b border-border sticky top-0 z-40 spotlight overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        '--x': `${mousePosition.x}%`,
        '--y': `${mousePosition.y}%`,
      } as React.CSSProperties}
    >
      <GradientTimeIndicator />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16">
          {/* App Title */}
          <div className="flex items-center">
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Event Horizon
            </h1>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-4">
            {/* View Toggle */}
            <div className="flex items-center neumorphic rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange("grid")}
                className="flex items-center text-sm font-medium liquid-transition hover:scale-105"
                data-testid="button-grid-view"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange("list")}
                className="flex items-center text-sm font-medium liquid-transition hover:scale-105"
                data-testid="button-list-view"
              >
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
            </div>

            {/* Calendar Navigation */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onPreviousMonth}
                className="p-2 hover:scale-110 transition-all duration-200"
                data-testid="button-previous-month"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-xl font-semibold min-w-[140px] text-center">
                {format(currentDate, "MMMM yyyy")}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onNextMonth}
                className="p-2 hover:scale-110 transition-all duration-200"
                data-testid="button-next-month"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onToday}
              className="text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 hover:scale-105"
              data-testid="button-today"
            >
              Today
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleThemeToggle}
              className="p-2 neumorphic hover:scale-110 liquid-transition"
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4 text-yellow-400" />
              )}
            </Button>

            {/* Add Event Button */}
            <motion.div
              layoutId="add-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onAddEvent}
                className="bg-primary hover:bg-blue-600 text-white font-medium shadow-lg liquid-transition animate-morph"
                data-testid="button-add-event"
              >
                <motion.div
                  layoutId="plus-icon"
                  className="flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}
