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
      <script src="https://kit.fontawesome.com/760f314f8c.js" crossOrigin="anonymous"></script>
      <AlertBox/>
      <h1>Gestion des préventes</h1>
      <EntriesCard user={props.user}/>
      <EntriesTable user={props.user}/>
    </>
  )
}
