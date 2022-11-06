import '../css/timer.css'
import {Entries, getEntries, useEntries, User} from "../api";

interface Props {
  user: User
}

export function EntriesOrder(props: Props) {
  const [entries, _] = useEntries(props.user.token)
  return (
    <p>
      <ul>
        <li>First</li>
      {
        entries.map(e => (
          <li>{e.id} - {e.timestamp} - {e.orderedQuantity}</li>
        ))
      }
      </ul>
    </p>
  )
}

