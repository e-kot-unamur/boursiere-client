import type { User } from '../api'
import { AlertBox } from '../components/AlertBox'
import {EntriesTable} from "../components/EntriesTable";
import {EntriesCard} from "../components/EntriesCard";
import '../css/entries.css'

interface Props {
  user: User
}

export function EntriesPage(props: Props) {
  return (
    <>
      <AlertBox />
      <h1>Gestion des préventes</h1>
      <EntriesCard  user={props.user} />
      <EntriesTable user={props.user} />
    </>
  )
}
