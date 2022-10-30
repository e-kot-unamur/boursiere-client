import type { User } from '../api'
import { AlertBox } from '../components/AlertBox'
import { OrderTable } from '../components/OrderTable'
import { BeerTimer } from '../components/BeerTimer'

interface Props {
  user: User
}

export function OrderPage(props: Props) {
  return (
    <>
      <AlertBox />
      <BeerTimer />
      <OrderTable user={props.user} />
    </>
  )
}
