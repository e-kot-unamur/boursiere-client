import type { User } from '../api'
import { AlertBox } from '../components/AlertBox'
import {EntriesOrder} from "../components/EntriesOrder";

interface Props {
  user: User
}

export function OrderPage(props: Props) {
  return (
    <>
      <AlertBox />
      <EntriesOrder  user={props.user}/>
    </>
  )
}
