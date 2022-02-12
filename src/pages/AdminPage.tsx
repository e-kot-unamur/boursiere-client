import type { User } from '../api'
import { AdminBeers } from '../components/AdminBeers'
import { AdminControl } from '../components/AdminControl'
import { AdminStats } from '../components/AdminStats'
import { AdminUsers } from '../components/AdminUsers'

interface Props {
  user: User
}

export function AdminPage(props: Props) {
  if (!props.user.admin) {
    return (
      <p>Cette page n'est accessible qu'aux administrateurs.</p>
    )
  }

  return (
    <>
      <AdminControl user={props.user} />
      <AdminStats user={props.user} />
      <AdminBeers user={props.user} />
      <AdminUsers user={props.user} />
    </>
  )
}
