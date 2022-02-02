import type { FunctionComponent } from 'preact'
import { useState } from 'preact/hooks'
import type { User } from '../api'
import { UserFormLogin } from './UserFormLogin'

interface Props {
  page: FunctionComponent<{ user: User }>
}

export function UserProvider(props: Props) {
  const [user, storeUser] = useLocalStorage<User | null>('user', null)
  return user === null
    ? <UserFormLogin onLogin={storeUser} />
    : <props.page user={user} />
}

function useLocalStorage<T>(key: string, defaultValue: T): [T, (newValue: T) => void] {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key)
    return item !== null ? JSON.parse(item) as T : defaultValue
  })

  function storeValue(newValue: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(newValue))
    } catch (err) {
      console.log(`failed to store ${key} to localStorage: ${err}`)
    } finally {
      setValue(newValue)
    }
  }

  return [value, storeValue]
}
