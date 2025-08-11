import { useQuery } from "@tanstack/react-query";
import type { Event } from "@shared/schema";

export function useEvents(year: number, month: number) {
  return useQuery<Event[]>({
    queryKey: ["/api/events", "month", year, month],
    queryFn: async () => {
      const response = await fetch(`/api/events/month/${year}/${month}`);
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      return response.json();
    },
  });
}

export function useAllEvents() {
  return useQuery<Event[]>({
    queryKey: ["/api/events"],
    queryFn: async () => {
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      return response.json();
    },
  });
}
