import type { FunctionComponent } from 'preact'
import type { User } from '../api'
import { useLocalStorage } from '../hooks'
import { AlertBox } from './AlertBox'
import { UserFormLogin } from './UserFormLogin'
import { UserHeader } from './UserHeader'

interface Props {
  page: FunctionComponent<{ user: User }>
}

export function UserProvider(props: Props) {
  const [user, storeUser] = useLocalStorage<User | null>('user', null)

  if (user === null) {
    return (
      <>
        <AlertBox />
        <UserFormLogin onLogin={storeUser} />
      </>
    )
  }

  return (
    <>
      <UserHeader user={user} />
      <props.page user={user} />
    </>
  )
}
