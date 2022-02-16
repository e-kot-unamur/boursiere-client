import { useEffect, useState } from 'preact/hooks'

export function dispatchError(err: Error) {
  dispatchEvent(new CustomEvent('api-error', { detail: err }))
}

export function AlertBox() {
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const handleCustomError = (e: CustomEvent<Error>) => setError(e.detail)
    // @ts-expect-error: event type does not exist
    addEventListener('api-error', handleCustomError)
    // @ts-expect-error: event type does not exist
    return () => removeEventListener('api-error', handleCustomError)
  }, [])

  if (error === null) {
    return null
  }

  return (
    <div class="alert" onAnimationEnd={() => setError(null)}>
      <strong>{error.name}</strong>: {error.message}
    </div>
  )
}
