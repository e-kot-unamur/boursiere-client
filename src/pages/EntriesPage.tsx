import type { User } from '../api'
import { AlertBox } from '../components/AlertBox'
import {EntriesTable} from "../components/EntriesTable";
import {EntriesCard} from "../components/EntriesCard";

interface Props {
  user: User
}

export function EntriesPage(props: Props) {
  return (
    <>
      <AlertBox />
      <EntriesCard  user={props.user}/>
      <EntriesTable user={props.user}/>
    </>
  )
}
