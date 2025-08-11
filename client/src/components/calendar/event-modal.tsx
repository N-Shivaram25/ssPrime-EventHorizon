import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  GlassDialog, 
  GlassDialogContent, 
  GlassDialogHeader, 
  GlassDialogTitle,
  GlassDialogDescription 
} from "@/components/ui/glass-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useConfetti } from "@/hooks/use-confetti";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Event, InsertEvent } from "@shared/schema";

interface EventModalProps {
  isOpen: boolean;
  selectedDate: string | null;
  editingEvent: Event | null;
  onClose: () => void;
}

const eventColors = [
  { value: "#3B82F6", label: "Blue", className: "bg-blue-500" },
  { value: "#EF4444", label: "Red", className: "bg-red-500" },
  { value: "#10B981", label: "Green", className: "bg-green-500" },
  { value: "#F59E0B", label: "Amber", className: "bg-amber-500" },
];

export default function EventModal({ isOpen, selectedDate, editingEvent, onClose }: EventModalProps) {
  const { toast } = useToast();
  const { triggerSuccess } = useConfetti();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    color: "#3B82F6",
  });

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title,
        description: editingEvent.description || "",
        date: editingEvent.date,
        startTime: editingEvent.startTime || "",
        endTime: editingEvent.endTime || "",
        color: editingEvent.color,
      });
    } else if (selectedDate) {
      setFormData({
        title: "",
        description: "",
        date: selectedDate,
        startTime: "",
        endTime: "",
        color: "#3B82F6",
      });
    }
  }, [editingEvent, selectedDate]);

  const createMutation = useMutation({
    mutationFn: async (data: InsertEvent) => {
      const response = await apiRequest("POST", "/api/events", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      triggerSuccess();
      toast({
        title: "Success",
        description: "Event created successfully",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: InsertEvent) => {
      const response = await apiRequest("PUT", `/api/events/${editingEvent?.id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      triggerSuccess();
      toast({
        title: "Success",
        description: "Event updated successfully",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update event",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Event title is required",
        variant: "destructive",
      });
      return;
    }

    const eventData: InsertEvent = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      date: formData.date,
      startTime: formData.startTime || undefined,
      endTime: formData.endTime || undefined,
      color: formData.color,
    };

    if (editingEvent) {
      updateMutation.mutate(eventData);
    } else {
      createMutation.mutate(eventData);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <GlassDialog open={isOpen} onOpenChange={onClose}>
      <GlassDialogContent className="sm:max-w-[425px]">
        <GlassDialogHeader>
          <GlassDialogTitle>
            {editingEvent ? "Edit Event" : "Add New Event"}
          </GlassDialogTitle>
          <GlassDialogDescription>
            {editingEvent ? "Update your event details" : "Create a new event for your calendar"}
          </GlassDialogDescription>
        </GlassDialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-foreground">
                Event Title
              </Label>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter event title"
                className="minimalist-input text-foreground placeholder:text-muted-foreground"
                data-testid="input-event-title"
              />
            </div>

            <div>
              <Label htmlFor="date" className="text-sm font-medium text-foreground">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="minimalist-input text-foreground"
                data-testid="input-event-date"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime" className="text-sm font-medium text-foreground">
                  Start Time
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange("startTime", e.target.value)}
                  className="minimalist-input text-foreground"
                  data-testid="input-start-time"
                />
              </div>
              <div>
                <Label htmlFor="endTime" className="text-sm font-medium text-foreground">
                  End Time
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                  className="minimalist-input text-foreground"
                  data-testid="input-end-time"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block text-foreground">Color</Label>
              <div className="flex space-x-2">
                {eventColors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 border-border shadow-sm hover:scale-110 transition-transform ${
                      color.className
                    } ${
                      formData.color === color.value
                        ? "ring-2 ring-offset-2 ring-primary"
                        : ""
                    }`}
                    onClick={() => handleInputChange("color", color.value)}
                    data-testid={`color-picker-${color.value}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium text-foreground">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Add event description..."
                className="resize-none minimalist-input text-foreground placeholder:text-muted-foreground"
                rows={3}
                data-testid="textarea-event-description"
              />
            </div>

            <div className="flex space-x-4 pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="flex-1 text-muted-foreground hover:text-foreground hover:bg-muted liquid-transition"
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <motion.div
                layoutId="add-button"
                className="flex-1"
              >
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white liquid-transition hover:scale-105 shadow-lg"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-event"
                >
                  <motion.div
                    layoutId="plus-icon"
                    className="flex items-center justify-center"
                  >
                    {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Event"}
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </form>
      </GlassDialogContent>
    </GlassDialog>
  );
}
