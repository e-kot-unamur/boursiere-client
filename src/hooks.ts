import { Inputs, useEffect, useState } from 'preact/hooks'

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
    source.addEventListener('message', (e: MessageEvent<string>) => {
      const event = JSON.parse(e.data) as T
      handle(event)
    })
    return () => {
      source.close()
    }
  }, inputs)
}
