# 🎬 Flickerly - Movie Discovery Platform

A responsive movie discovery platform built with SvelteKit and TypeScript, integrating the TMDB API to help users explore movies, view details, watch trailers, save titles to a watchlist and discover where content is available to stream or rent.

## 🔗 Links

- Live Demo: https://flickerly.netlify.app
- Portfolio: https://takmuzunze.co.uk

## ✨ Features

- Browse trending, top-rated, in-cinema and genre-based movie sections
- View detailed movie information including rating, release year, runtime, language and genres
- Watch trailers directly from movie cards/details
- Add movies to a watchlist
- View streaming and rental provider availability where available
- Share movie titles
- Infinite scrolling / dynamic content loading
- Responsive layout across desktop, tablet and mobile
- Reusable component architecture
- TypeScript support throughout the application
- Tailwind CSS styling

## 🛠️ Tech Stack

- SvelteKit
- TypeScript
- Tailwind CSS
- TMDB API
- Netlify

## 🧠 Engineering Focus

### Secure API Integration

Flickerly uses SvelteKit server routes to communicate with the TMDB API, keeping API keys away from the client and creating a cleaner internal API layer for frontend components.

### Dynamic Content Loading

Movie sections are powered by reusable fetching logic, allowing the application to display different categories such as trending, in-cinema, genre-based and top-rated movies.

### Component Architecture

The UI is built using reusable components for movie cards, content sections, hero content, buttons and interactive elements, keeping the interface easier to maintain and extend.

### User Experience

The app focuses on a polished browsing experience with responsive layouts, dynamic movie information, trailer access, watchlist functionality and streaming provider discovery.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/TakundaMuzunze/Flickerly.git
cd Flickerly
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
TMDB_KEY=your_tmdb_api_key_here
```

Start the development server:

```bash
npm run dev
```

Open the app locally:

```txt
http://localhost:5173
```

## 📜 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run check     # Run Svelte/TypeScript checks
npm run lint      # Run linting
npm run format    # Format code
```

## 🗺️ Roadmap

Planned improvements for Flickerly 2.0:

- Improve movie detail pages
- Refine watchlist/favourites functionality
- Add stronger search and filtering interactions

## 📄 License

This project is licensed under the MIT License.
