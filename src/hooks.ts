import { useState } from 'preact/hooks'

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
