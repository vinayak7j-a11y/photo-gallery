# Photo Gallery

A Photo Gallery web app built with React, Vite and Tailwind CSS. It fetches photos from the Picsum Photos API (https://picsum.photos/v2/list?limit=30), shows them in a responsive grid, lets you search by author name, and lets you mark favourites.

## Features

- Fetches 30 photos on load, with a loading spinner and an error message
- Responsive grid: 4 columns on desktop, 2 on tablet, 1 on mobile
- Real-time search by author name (filters the already-fetched data, no extra API call)
- Favourites toggled with a heart icon, managed with useReducer and persisted in localStorage
- Custom hook useFetchPhotos that returns photos, loading and error
- useCallback on the search handler and useMemo for the filtered list

## Tech

React, Vite, Tailwind CSS. No other UI libraries.

## Run locally

    npm install --legacy-peer-deps
    npm run dev

Then open http://localhost:5173.

## Project structure

    src/
      components/   Gallery.jsx, PhotoCard.jsx
      hooks/        useFetchPhotos.js
      reducers/     favouritesReducer.js
