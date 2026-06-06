# Letterly - AI Email Writer

A modern web application that helps users write emails using artificial intelligence. Generate professional, casual, or business emails with just a few clicks.

## Overview

Letterly is a full-stack AI-powered email generation platform built with cutting-edge technologies. Users can sign up, authenticate, and use the AI assistant to compose emails in different tones and styles.

## Features

- **User Authentication**: Secure sign-up and login with bcrypt password hashing
- **AI Email Generation**: Generate emails using Groq AI with three distinct tones:
  - **Casual**: Friendly, warm, and conversational
  - **Formal**: Professional, polite, and respectful
  - **Business**: Direct, efficient, and executive-style
- **Session Management**: Secure session-based user authentication with HTTP-only cookies
- **Real-time Streaming**: Server-Sent Events (SSE) for real-time email generation feedback
- **Responsive UI**: Built with modern UI components and Tailwind CSS
- **Form Validation**: Client-side validation with toast notifications

## Tech Stack

### Frontend
- **Framework**: Next.js 16.2.7
- **React**: 19.2.4 with Server Components
- **Styling**: Tailwind CSS 4, PostCSS
- **UI Components**: Shadcn/UI, HeroUI, Radix UI
- **Icons**: Lucide React
- **Animations**: Motion, Remotion
- **State Management**: React Hooks, TanStack AI React
- **Notifications**: React Hot Toast
- **Form Handling**: Zod for validation

### Backend
- **Runtime**: Node.js with Next.js API Routes
- **Database**: PostgreSQL with Drizzle ORM
- **AI/LLM**: TanStack AI with Groq API
- **Authentication**: bcrypt for password hashing
- **Database Migration**: Drizzle Kit

### Development
- **Language**: TypeScript 5
- **Package Manager**: Bun
- **Linting**: ESLint 9
- **Build Tool**: Next.js built-in

## Project Structure

```
ai-email-writer/
├── app/                           # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── chat/route.ts        # AI email generation endpoint
│   │   ├── login/route.ts       # User login endpoint
│   │   ├── logout/route.ts      # User logout endpoint
│   │   └── register/route.ts    # User registration endpoint
│   ├── sign-in/page.tsx         # Login page
│   ├── sign-up/page.tsx         # Registration page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main email generation page
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── login-form.tsx           # Login form component
│   ├── signup-form.tsx          # Registration form component
│   ├── select-component.tsx     # Tone selector component
│   └── ui/                      # Shadcn UI components
│       ├── button.tsx
│       ├── input.tsx
│       ├── field.tsx
│       ├── label.tsx
│       └── ...other UI components
├── src/
│   ├── db/
│   │   └── schema.ts            # Database schema (Drizzle)
│   ├── page-components/         # Page-specific components
│   │   ├── login.tsx
│   │   └── signup.tsx
│   └── components/
│       └── remocn/              # Animation components
├── actions/
│   └── getProfile.ts            # Server action to get user profile
├── lib/
│   └── utils.ts                 # Utility functions
├── drizzle/                     # Database migrations
├── public/                      # Static assets
├── drizzle.config.ts           # Drizzle Kit configuration
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── postcss.config.mjs          # PostCSS configuration
└── package.json                # Dependencies and scripts
```

## Environment Setup

### Prerequisites
- Node.js 18+ (using Bun as package manager)
- PostgreSQL database
- Groq API key

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/letterly

# Groq AI API
GROQ_API_KEY=your_groq_api_key_here

# Node Environment
NODE_ENV=development
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-email-writer
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Fill in your PostgreSQL connection string and Groq API key

4. **Run database migrations**
   ```bash
   bun run drizzle-kit push
   ```

5. **Start development server**
   ```bash
   bun run dev
   ```

   The application will be available at `http://localhost:3000`

## Available Scripts

```bash
# Development
bun run dev          # Start development server with hot reload

# Production
bun run build        # Build for production
bun run start        # Start production server

# Linting
bun run lint         # Run ESLint
```

## Database Schema

The users table stores:
- `id`: Auto-generated unique identifier
- `name`: User's full name
- `email`: User's email (unique)
- `password`: Bcrypt-hashed password
- `sessionId`: Current session identifier for authentication


## Key Technologies Explained

### TanStack AI
Unified library for streaming AI responses from multiple providers. Used here with Groq for:
- Message streaming
- Server-Sent Events handling
- Unified API across different LLM providers

### Drizzle ORM
Type-safe SQL query builder with:
- PostgreSQL support
- Automatic migrations
- Type-safe schema definitions

### Shadcn/UI
Customizable React component library with:
- Copy-paste component installation
- Built on Radix UI primitives
- Tailwind CSS styling

## Development Features

- **Hot Module Reloading**: Changes reflect instantly during development
- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code quality and consistency checking
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Deployment

### Build for Production
```bash
bun run build
```

### Start Production Server
```bash
bun run start
```

### Environment Configuration
Update `.env.production` with production database URL and API keys before deploying.

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check `DATABASE_URL` in `.env.local`
- Run migrations: `bun run drizzle-kit push`

### Login Not Working
- Ensure password is at least 8 characters
- Verify email exists in database
- Check browser cookies are enabled

### AI Generation Fails
- Verify Groq API key is set
- Check API rate limits
- Ensure user is authenticated (valid session)

## Security Considerations

- **Password Security**: All passwords are hashed with bcrypt
- **Session Security**: HTTP-only cookies prevent XSS attacks
- **CSRF Protection**: SameSite cookie attribute set to 'lax'
- **Input Validation**: Server-side validation on all API endpoints
- **Authentication**: All AI endpoints require valid session

## Performance Optimizations

- **Server-Side Rendering**: Next.js SSR for better SEO and performance
- **Code Splitting**: Automatic code splitting per route
- **Image Optimization**: Next.js Image component for optimized images
- **Streaming**: SSE for real-time UI updates without full page refresh

## Future Enhancements

- Email history and saving
- Template library
- Multiple AI providers
- Advanced email customization
- Email scheduling
- Analytics and usage tracking
- Export to email client (Gmail, Outlook)
- Collaborative writing

## License

This project is part of the Cohort 2026 Full Stack curriculum.

## Support

For issues, questions, or contributions, please contact the development team or create an issue in the repository.
