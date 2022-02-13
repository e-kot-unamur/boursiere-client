import { Inputs, useEffect, useState } from 'preact/hooks'

export function useIntUrlFragment(): number | undefined {
  const [fragment, setFragment] = useState(getIntUrlFragment)

  useEffect(() => {
    const handleHashChange = () => setFragment(getIntUrlFragment)
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return fragment
}

function getIntUrlFragment(): number | undefined {
  const value = parseInt(location.hash.substring(1))
  return Number.isNaN(value) ? undefined : value
}

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (newValue: T) => void] {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key)
    return item !== null ? JSON.parse(item) as T : defaultValue
  })

  const storeValue = (newValue: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue))
    } catch (err) {
      console.error(`failed to store ${key} to localStorage: ${err}`)
    } finally {
      setValue(newValue)
    }
  }

  return [value, storeValue]
}

export function useEvents<T>(url: string, handle: (event: T) => void, inputs: Inputs) {
  useEffect(() => {
    const source = new EventSource(url)
    source.onmessage = e => handle(JSON.parse(e.data) as T)
    return () => source.close()
  }, inputs)
}
