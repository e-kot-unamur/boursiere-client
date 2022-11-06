import '../css/timer.css'
import {Entries, getEntries, getEntriesStatistics, getStatistics, useEntries, User} from "../api";
import {useEffect, useState} from "preact/hooks";
import {dispatchError} from "./AlertBox";

interface Props {
  user: User
}

export function EntriesTable(props: Props) {
  const [entries, _] = useEntries(props.user.token)
  const [stat, setStats] = useState<number>(0)

  useEffect(() => {
    getEntriesStatistics(props.user.token)
      .then(setStats)
      .catch(dispatchError)
  }, [props.user.token, entries])

  return (
    <p>
      Nombre de vente : {stat}
      <ul>
      {
        entries.map(e => (
          <li>{e.id} - {e.timestamp} - {e.orderedQuantity}</li>
        ))
      }
      </ul>
    </p>
  )
}

