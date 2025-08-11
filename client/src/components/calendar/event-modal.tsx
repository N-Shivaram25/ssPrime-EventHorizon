import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? "Edit Event" : "Add New Event"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium">
                Event Title
              </Label>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter event title"
                className="focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                data-testid="input-event-title"
              />
            </div>

            <div>
              <Label htmlFor="date" className="text-sm font-medium">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                data-testid="input-event-date"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime" className="text-sm font-medium">
                  Start Time
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange("startTime", e.target.value)}
                  className="focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  data-testid="input-start-time"
                />
              </div>
              <div>
                <Label htmlFor="endTime" className="text-sm font-medium">
                  End Time
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                  className="focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  data-testid="input-end-time"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Color</Label>
              <div className="flex space-x-2">
                {eventColors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform ${
                      color.className
                    } ${
                      formData.color === color.value
                        ? "ring-2 ring-offset-2 ring-gray-400"
                        : ""
                    }`}
                    onClick={() => handleInputChange("color", color.value)}
                    data-testid={`color-picker-${color.value}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Add event description..."
                className="resize-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                rows={3}
                data-testid="textarea-event-description"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 transition-all duration-200 hover:scale-105"
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-blue-600 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                disabled={createMutation.isPending || updateMutation.isPending}
                data-testid="button-save-event"
              >
                {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Event"}
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
