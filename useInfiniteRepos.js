import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchRepos } from '../services/github'

/**
 * Custom hook for infinite scroll repository loading
 */
export function useInfiniteRepos(username, { sort, direction, type }) {
  const [repos, setRepos] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const sentinelRef = useRef(null)

  // Reset when filters change
  useEffect(() => {
    setRepos([])
    setPage(1)
    setHasMore(true)
    setError(null)
  }, [username, sort, direction, type])

  // Load page
  useEffect(() => {
    if (!username || !hasMore) return

    setLoading(true)
    fetchRepos(username, { page, per_page: 10, sort, direction, type })
      .then((data) => {
        setRepos((prev) => (page === 1 ? data : [...prev, ...data]))
        if (data.length < 10) setHasMore(false)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, page, sort, direction, type])

  // IntersectionObserver for infinite scroll sentinel
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((p) => p + 1)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, loading])

  return { repos, loading, error, hasMore, sentinelRef }
}
