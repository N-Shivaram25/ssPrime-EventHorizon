import { type User, type InsertUser, type Event, type InsertEvent } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Event CRUD operations
  getAllEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  getEventsByDate(date: string): Promise<Event[]>;
  getEventsByMonth(year: number, month: number): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private events: Map<string, Event>;

  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.seedSampleEvents();
  }

  private seedSampleEvents() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    
    const sampleEvents = [
      {
        id: randomUUID(),
        title: "Team Meeting",
        description: "Weekly team sync and project updates",
        date: `${year}-${month}-${today.getDate().toString().padStart(2, '0')}`,
        startTime: "10:00",
        endTime: "11:00",
        color: "#3B82F6",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Client Presentation",
        description: "Present the quarterly results to the client",
        date: `${year}-${month}-${(today.getDate() + 2).toString().padStart(2, '0')}`,
        startTime: "14:00",
        endTime: "15:30",
        color: "#EF4444",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Design Workshop",
        description: "Collaborative design session for the new product",
        date: `${year}-${month}-${(today.getDate() + 5).toString().padStart(2, '0')}`,
        startTime: "09:00",
        endTime: "12:00",
        color: "#10B981",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Code Review",
        description: "Review pull requests and discuss implementation",
        date: `${year}-${month}-${(today.getDate() + 7).toString().padStart(2, '0')}`,
        startTime: "16:00",
        endTime: "17:00",
        color: "#F59E0B",
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Project Planning",
        description: "Plan the roadmap for next quarter",
        date: `${year}-${month}-${(today.getDate() + 10).toString().padStart(2, '0')}`,
        startTime: "13:00",
        endTime: "14:30",
        color: "#3B82F6",
        createdAt: new Date()
      }
    ];

    sampleEvents.forEach(event => {
      this.events.set(event.id, event);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getEventsByDate(date: string): Promise<Event[]> {
    return Array.from(this.events.values()).filter(event => event.date === date);
  }

  async getEventsByMonth(year: number, month: number): Promise<Event[]> {
    const monthStr = month.toString().padStart(2, '0');
    const yearMonthPrefix = `${year}-${monthStr}`;
    
    return Array.from(this.events.values()).filter(event => 
      event.date.startsWith(yearMonthPrefix)
    );
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const event: Event = { 
      ...insertEvent, 
      id,
      color: insertEvent.color || "#3B82F6",
      description: insertEvent.description || null,
      startTime: insertEvent.startTime || null,
      endTime: insertEvent.endTime || null,
      createdAt: new Date()
    };
    this.events.set(id, event);
    return event;
  }

  async updateEvent(id: string, updateData: Partial<InsertEvent>): Promise<Event | undefined> {
    const existingEvent = this.events.get(id);
    if (!existingEvent) return undefined;

    const updatedEvent: Event = { ...existingEvent, ...updateData };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  async deleteEvent(id: string): Promise<boolean> {
    return this.events.delete(id);
  }
}

export const storage = new MemStorage();
