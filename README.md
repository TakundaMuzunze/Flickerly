# 🎬 Flickerly - Movie Discovery Platform

A modern, responsive movie discovery application built with SvelteKit that helps users explore, track, and discover movies and TV shows. Create personalized watchlists and find where to stream your favorite content.

## ✨ Features

### 🎯 Core Functionality

- **Movie Discovery**: Browse trending, top-rated, and genre-specific movies
- **Search & Filter**: Advanced search with filtering by genre, rating, and release date
- **Watchlist Management**: Save and organize your favorite movies
- **Movie Details**: Comprehensive movie information including cast, trailers, and streaming providers
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🎨 User Interface

- **Modern UI**: Clean, intuitive interface with smooth animations
- **Dark Theme**: Eye-friendly dark mode design
- **Infinite Scroll**: Seamless browsing experience
- **Interactive Components**: Modal dialogs, carousels, and dynamic grids

### 🔧 Technical Features

- **Server-Side Rendering**: Fast initial page loads with SvelteKit
- **API Integration**: TMDB (The Movie Database) integration for comprehensive movie data
- **Type Safety**: Full TypeScript support throughout the application
- **Component Architecture**: Modular, reusable component system

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/TakundaMuzunze/Flickerly
   cd cinescope
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   TMDB_KEY=your_tmdb_api_key_here
   ```

   Get your TMDB API key from [The Movie Database](https://www.themoviedb.org/settings/api)

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
cinescope/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ui/              # Reusable UI components
│   │   │   │   ├── Cards/      
│   │   │   │   ├── FilterBar/   
│   │   │   │   └── Modals/      
│   │   │   ├── layout/          # Layout components
│   │   │   │   ├── Grids/       
│   │   │   │   ├── Header/      
│   │   │   │   └── Footer/      
│   │   │   ├── sections/        # Page sections
│   │   │   │   ├── Hero/        
│   │   │   │   └── MovieSection/ 
│   │   │   └── features/        # Feature-specific components
│   │   │       ├── Search/      # Search functionality
│   │   │       ├── Details/     # Movie detail components
│   │   │       └── TrailerComponent/ # Video trailers
│   │   ├── services/            # API service layer
│   │   │   ├── movies.ts        # Movie data services
│   │   │   ├── search.ts        # Search functionality
│   │   │   ├── cast.ts          # Cast information
│   │   │   └── genres.ts        # Genre management
│   │   ├── stores/              # Svelte stores
│   │   │   ├── movieStore.stores.svelte.ts
│   │   │   ├── watchlist.stores.svelte.ts
│   │   │   └── genres.stores.svelte.ts
│   │   ├── types/               # TypeScript type definitions
│   │   │   ├── movie.ts
│   │   │   ├── genres.ts
│   │   │   └── trailer.ts
│   │   └── utils/               # Utility functions
│   │       ├── fuzzySearch.ts
│   │       ├── imageCaching.ts
│   │       └── infiniteScroll.ts
│   ├── routes/                  # SvelteKit routes
│   │   ├── api/                 # API endpoints
│   │   ├── genre/               # Genre-specific pages
│   │   ├── movies/              # Movie detail pages
│   │   └── watchlist/           # User watchlist
│   └── app.html                 # HTML template
├── static/                      # Static assets
│   ├── favicon.png
│   ├── images/                  # Rating icons
│   └── fonts/                   # Custom fonts
└── package.json
```

## 🛠️ Architecture

### Frontend Framework

- **SvelteKit**: Full-stack framework with SSR capabilities
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Storybook**: For building and etsting UI components in isolation

### State Management

- **Svelte Stores**: Reactive state management
- **Local Storage**: Persistent watchlist data

### API Integration

- **TMDB API**: Movie data and metadata
- **Server-Side API**: Secure API endpoints for client-side consumption

### Component Architecture

- **Modular Design**: Reusable components organized by functionality
- **Composition Pattern**: Components composed of smaller, focused pieces
- **Type Safety**: Full TypeScript integration for all components

## 📱 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run check        # Type check
npm run lint         # Lint code
npm run format       # Format code


```

## 🌐 API Endpoints

### Internal API Routes

- `GET /api/movies` - Fetch movies by type or genre
- `GET /api/genre/[id]` - Get genre-specific movies
- `GET /api/movies/trending` - Trending movies
- `GET /api/movies/top-rated` - Top-rated movies
- `GET /api/movies/now-playing` - Currently in theaters

### External API

- **TMDB API**: All movie data sourced from The Movie Database

## 🔒 Environment Variables

```env
TMDB_KEY=your_tmdb_api_key_here
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
