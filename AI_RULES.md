# AI Development Rules for Quintal do Marchetti App

## Tech Stack Overview

- **Frontend Framework**: React 19 with TypeScript for type-safe UI development
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS for utility-first responsive design
- **State Management**: React built-in hooks (useState, useEffect) for local state
- **UI Components**: Custom component library with shadcn/ui principles
- **Routing**: React Router for client-side navigation
- **Data Persistence**: Supabase for backend storage and authentication
- **AI Integration**: Google Gemini API for intelligent checklist generation
- **PDF Generation**: jsPDF and html2canvas for client-side PDF exports
- **Deployment**: Static site hosting with PWA capabilities

## Library Usage Rules

### Core UI Libraries
- **React 19**: Only use official React APIs and hooks
- **Tailwind CSS**: All styling must be done with Tailwind utility classes
- **Lucide Icons**: Use only Lucide React icons for consistent iconography

### Data Management
- **Supabase**: Use for all data persistence, authentication, and real-time features
- **Local Storage**: Only for temporary caching and offline capabilities
- **Context API**: For global state management (theme, authentication)

### AI Integration
- **Google Gemini API**: Only for generating checklists and text content
- **Prompt Engineering**: All prompts must be in Portuguese and specific to restaurant operations
- **Error Handling**: Always provide fallback content when AI fails

### File Operations
- **jsPDF/html2canvas**: Only for PDF generation features
- **File Handling**: Use browser-native APIs for image processing

### Component Development
- **Component Structure**: Each component in its own file under appropriate directories
- **Props Validation**: Use TypeScript interfaces for all component props
- **Reusability**: Components should be generic and reusable across categories

### Security
- **Environment Variables**: Never expose API keys in client-side code
- **Authentication**: Always use Supabase authentication wrappers
- **Data Validation**: Validate all user inputs before processing

### Performance
- **Lazy Loading**: Implement for code-splitting large components
- **Memoization**: Use React.memo for expensive re-renders
- **Bundle Optimization**: Keep bundle size under 300KB for optimal performance

### Testing
- **Unit Testing**: Use Jest for utility functions
- **Component Testing**: Use React Testing Library for UI components
- **E2E Testing**: Use Cypress for critical user flows

### Accessibility
- **ARIA Labels**: All interactive elements must have proper labels
- **Keyboard Navigation**: Ensure all functionality works with keyboard
- **Color Contrast**: Maintain WCAG 2.1 AA compliance for text

### Mobile Responsiveness
- **Mobile First**: Design for mobile devices first
- **Touch Targets**: Minimum 44px touch targets for interactive elements
- **Performance**: Optimize for low-bandwidth mobile connections