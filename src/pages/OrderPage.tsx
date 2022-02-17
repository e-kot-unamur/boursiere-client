import type { User } from '../api'
import { AlertBox } from '../components/AlertBox'
import { OrderTable } from '../components/OrderTable'

interface Props {
  user: User
}

export function OrderPage(props: Props) {
  return (
    <>
      <AlertBox />
      <OrderTable user={props.user} />
    </>
  )
}
