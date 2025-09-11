# EventsMail - Event Helper for Tickets & Certificates

A secure email management platform built with Next.js, featuring Google OAuth authentication and protected routes.

## Features

- 🔐 **Secure Google OAuth Authentication** - Login with your Google account
- 🛡️ **Protected Routes** - Middleware-based route protection
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Modern UI** - Clean and intuitive interface with Tailwind CSS
- ⚡ **Fast Performance** - Built with Next.js 15 and React 19
- 🔒 **Session Management** - Secure JWT-based sessions

## Security Features

- OAuth 2.0 authentication with Google
- Encrypted data transfer
- Protected API routes
- Session-based authorization
- Automatic redirect handling
- Secure middleware implementation

## Setup Instructions

### 1. Environment Variables

Copy the environment example file and configure your settings:

```bash
cp .env.example .env.local
```

Then fill in your environment variables in `.env.local`:

```env
# Generate a random secret for production
NEXTAUTH_SECRET=your-random-secret-key-here

# Your app URL
NEXTAUTH_URL=http://localhost:3000

# Google OAuth credentials (get from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Copy the Client ID and Client Secret to your `.env.local` file

### 3. Installation & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
hackmail/
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/route.ts  # NextAuth API routes
│   │   ├── auth/error/page.tsx              # Auth error page
│   │   ├── dashboard/page.tsx               # Protected dashboard
│   │   ├── layout.tsx                       # Root layout
│   │   └── page.tsx                         # Login page
│   ├── components/
│   │   ├── sign-in.tsx                      # Google sign-in component
│   │   └── sign-out.tsx                     # Sign-out component
│   ├── auth.ts                              # NextAuth configuration
│   └── middleware.ts                        # Route protection middleware
├── .env.example                             # Environment variables template
└── README.md
```

## Routes

- `/` - Login page (redirects to dashboard if authenticated)
- `/dashboard` - Protected dashboard (requires authentication)
- `/auth/error` - Authentication error page
- `/api/auth/*` - NextAuth API routes

## How It Works

1. **Login Flow**: 
   - User visits the home page
   - If not authenticated, shows Google login button
   - User clicks "Continue with Google"
   - Redirected to Google OAuth consent screen
   - After approval, redirected back to dashboard

2. **Protection**:
   - Middleware checks authentication status on every request
   - Unauthenticated users are redirected to login
   - Authenticated users accessing login page are redirected to dashboard

3. **Session Management**:
   - JWT-based sessions with NextAuth
   - Secure session cookies
   - Automatic session refresh

## Technologies Used

- **Next.js 15** - React framework
- **NextAuth.js** - Authentication library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React 19** - UI library

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


