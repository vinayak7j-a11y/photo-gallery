import { useReducer, useEffect, useState, useCallback, useMemo } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import {
  favouritesReducer,
  initFavourites,
  STORAGE_KEY,
} from '../reducers/favouritesReducer'
import PhotoCard from './PhotoCard'

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [favourites, dispatch] = useReducer(favouritesReducer, [], initFavourites)
  const [query, setQuery] = useState('')

  // Persist favourites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
  }, [favourites])

  // useCallback: keeps the same function reference between renders
  const handleSearch = useCallback((e) => {
    setQuery(e.target.value)
  }, [])

  const handleToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', id })
  }, [])

  // useMemo: only re-filter when photos or query change
  const filteredPhotos = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return photos
    return photos.filter((p) => p.author.toLowerCase().includes(q))
  }, [photos, query])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl p-4 sm:p-6">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Photo Gallery</h1>

        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search by author name..."
          className="mb-6 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        {loading && (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
          </div>
        )}

        {error && (
          <p className="rounded-lg bg-red-100 p-4 text-center text-red-700">
            Failed to load photos: {error}
          </p>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <p className="py-10 text-center text-gray-500">No photos found.</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favourites.includes(photo.id)}
                onToggle={handleToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
