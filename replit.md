# Event Horizon Calendar App

## Overview

Event Horizon is a Google Calendar-inspired React application built with a modern tech stack. It features a sophisticated calendar interface with sleek animations, dual themes (light/dark), and responsive design. The application provides both grid and list views for calendar events, with smooth micro-interactions and a polished user experience. The system uses a full-stack architecture with Express.js backend, React frontend, and PostgreSQL database integration via Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Radix UI primitives with shadcn/ui styling system
- **Styling**: Tailwind CSS with CSS variables for theming
- **Animations**: Framer Motion for smooth transitions and micro-interactions

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API with JSON responses
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Development**: Hot reloading with Vite integration in development mode

### Data Layer
- **Database**: PostgreSQL with connection via Neon Database serverless driver
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Schema**: Separate events and users tables with proper relationships
- **Validation**: Zod schemas for runtime validation and type inference
- **Storage Abstraction**: Interface-based storage layer with in-memory fallback for development

### Theming System
- **Implementation**: CSS custom properties with class-based theme switching
- **Persistence**: localStorage for theme preference persistence
- **Provider Pattern**: React context for theme state management across components
- **Design System**: Unified color palette with semantic naming conventions

### Calendar Features
- **View Modes**: Grid view (monthly calendar) and list view (chronological events)
- **Event Management**: Full CRUD operations with modal-based forms
- **Date Handling**: date-fns library for robust date manipulation
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts
- **Animations**: Enter/exit animations for modals, popovers, and event interactions

### Component Architecture
- **Pattern**: Composition-based components with clear separation of concerns
- **Reusability**: Shared UI components in dedicated ui directory
- **Props Interface**: TypeScript interfaces for all component props
- **Event Handling**: Consistent event propagation and state updates

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form for form management
- **Routing**: Wouter for lightweight routing solution
- **State Management**: TanStack React Query for server state caching and synchronization

### Database & Backend
- **Database Driver**: @neondatabase/serverless for PostgreSQL connectivity
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Validation**: Zod for schema validation and type inference

### UI & Styling
- **Component Library**: Extensive Radix UI collection for accessible primitives
- **Styling**: Tailwind CSS with PostCSS for utility-first styling
- **Icons**: Lucide React for consistent icon library
- **Animations**: Framer Motion for sophisticated animations and transitions

### Development Tools
- **Build Tool**: Vite with React plugin for fast development experience
- **Development**: TSX for TypeScript execution, Replit-specific development plugins
- **Fonts**: Google Fonts (Inter) for typography consistency

### Utility Libraries
- **Date Handling**: date-fns for comprehensive date manipulation
- **Styling Utilities**: clsx and tailwind-merge for conditional class handling
- **Class Variants**: class-variance-authority for component variant management