# Event Horizon Calendar App

## Overview

Event Horizon is a highly polished, interactive Google Calendar-inspired React application featuring cutting-edge design effects and sophisticated animations. The app showcases glass morphism, 3D flip animations, parallax scrolling, dynamic gradients, neumorphic UI elements, particle effects, and liquid smooth transitions. Built with a modern tech stack including React, Framer Motion, and advanced CSS techniques, it delivers an exceptional user experience with professional-grade visual effects.

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

### Advanced UI/UX Features
- **Glass Morphism**: Frosted glass effects with backdrop blur on modals and popovers
- **3D Flip Cards**: Interactive date cells that flip to reveal event details with rotateY animations
- **Parallax Scrolling**: Multi-layer depth effects in list view using react-scroll-parallax
- **Dynamic Time Gradients**: Header background that shifts colors based on time of day
- **Neumorphic Elements**: Soft 3D button shadows and tactile interface elements
- **Particle Effects**: Canvas-confetti integration for celebrations and theme changes
- **Animated SVG Paths**: Progressive drawing animations for success indicators
- **Spotlight Effects**: Cursor-following radial gradients for interactive headers
- **Liquid Transitions**: Smooth morphing animations with cubic-bezier easing

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

### Advanced Effects Libraries
- **Particle System**: canvas-confetti for celebration and interactive effects
- **Parallax**: react-scroll-parallax for depth-based scrolling animations
- **Type Safety**: @types/canvas-confetti for TypeScript support

### Development Tools
- **Build Tool**: Vite with React plugin for fast development experience
- **Development**: TSX for TypeScript execution, Replit-specific development plugins
- **Fonts**: Google Fonts (Inter) for typography consistency

### Utility Libraries
- **Date Handling**: date-fns for comprehensive date manipulation
- **Styling Utilities**: clsx and tailwind-merge for conditional class handling
- **Class Variants**: class-variance-authority for component variant management

## Recent Changes (August 2025)

### Major UI/UX Enhancement
- **Glass Morphism Implementation**: Added frosted glass dialogs with backdrop blur effects
- **3D Flip Animation System**: Interactive calendar date cards with rotateY flip animations
- **Parallax Scrolling**: Multi-speed scrolling effects in list view for depth perception
- **Dynamic Gradient System**: Time-based gradient backgrounds that shift throughout the day
- **Neumorphic Design**: Soft 3D button shadows and elevated interface elements
- **Particle Effects Integration**: Confetti celebrations for user interactions
- **Advanced Animation Framework**: Liquid smooth transitions with sophisticated easing
- **Spotlight Interaction**: Cursor-following radial gradients for immersive header experience