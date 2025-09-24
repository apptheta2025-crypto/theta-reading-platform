# Theta Reading Platform

A modern reading platform built with React, TypeScript, and Supabase. Features include ebook reading, audiobook listening, and user management.

## Features

- 📚 **Ebook Reading**: Support for PDF and EPUB formats
- 🎧 **Audiobook Listening**: High-quality audio playback
- 👤 **User Authentication**: Secure login and registration
- 📱 **Responsive Design**: Works on desktop and mobile
- 🎨 **Modern UI**: Built with Tailwind CSS and shadcn/ui
- 🔒 **Secure**: Powered by Supabase for backend services

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Database, Auth, Storage)
- **State Management**: React Context API
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/apptheta2025-crypto/theta-reading-platform.git
cd theta-reading-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your Supabase credentials in `.env.local`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Start the development server:
```bash
npm run dev
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add your environment variables
5. Deploy!

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components
│   ├── media/          # Media player components
│   └── ui/             # Base UI components
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
├── pages/              # Page components
├── services/           # Utility services
└── data/               # Mock data and mappings
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.