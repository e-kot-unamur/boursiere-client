import '../css/timer.css'
import {
  createEndOfParty,
  EntriesStatistics,
  getEntriesStatistics,
  useEntries,
  User
} from "../api";
import {useEffect, useState} from "preact/hooks";
import {dispatchError} from "./AlertBox";
import {toDate, toTime} from "../locales";

interface Props {
  user: User
}

export function EntriesTable(props: Props) {
  const [entries, _] = useEntries(props.user.token)
  const [stat, setStats] = useState<EntriesStatistics>({peopleCurrentParty: 0, totalSale: 0})

  useEffect(() => {
    getEntriesStatistics(props.user.token)
      .then(setStats)
      .catch(dispatchError)
  }, [props.user.token, entries])

  const handleEndOfParty = async () => {
    console.log("End Of Party")
    try {
      await createEndOfParty(props.user.token)
    } catch (err) {
      dispatchError(err as Error)
    }
  }

  return (
    <div class="list">
      <div class="nbSale">
        <span class="totalSale">
          Nombre total de vente : {stat.totalSale}
        </span><br/>
        <span class="peopleCurrentParty">
          Nombre total de personne dans la soirée : {stat.peopleCurrentParty}
        </span>
      </div>

      <table class="saleList">
      {
        entries.slice(0,10).map(e => (
          <tr>
            <td>{toDate(e.timestamp)}</td>
            <td>{toTime(e.timestamp)}</td>
            <td class="orderedQuantity">{e.orderedQuantity}</td>
          </tr>
        ))
      }
      </table>
      <button class="endOfParty" onClick={handleEndOfParty}>Prévente arrachée +1</button>
    </div>
  )
}

