import { useEffect, useState } from 'preact/hooks'
import {EntriesStatistics, getEntriesStatistics, getStatistics, Statistics, useBeers, useEntries, User} from '../api'
import { toPrice, toVolume } from '../locales'
import { dispatchError } from './AlertBox'

interface Props {
  user: User
}

export function AdminStats(props: Props) {
  const [beers, _] = useBeers()
  const [entries, __] = useEntries(props.user.token)
  const [beerStats, setStats] = useState<Statistics>({ estimatedProfit: 0 })
  const [entriesStat, setStat] = useState<EntriesStatistics>({peopleCurrentParty: 0, totalSale: 0})

  useEffect(() => {
    getStatistics(props.user.token)
      .then(setStats)
      .catch(dispatchError)
  }, [props.user.token, beers])

  useEffect(() => {
    getEntriesStatistics(props.user.token)
      .then(setStat)
      .catch(dispatchError)
  }, [props.user.token, entries])

  const totalQuantity = beers.reduce((a, b) => a + b.stockQuantity, 0)
  const soldQuantity = beers.reduce((a, b) => a + b.totalSoldQuantity, 0)
  const totalVolume = beers.reduce((a, b) => a + b.stockQuantity * b.bottleSize, 0)
  const soldVolume = beers.reduce((a, b) => a + b.totalSoldQuantity * b.bottleSize, 0)
  const soldAlcohol = beers.reduce((a, b) => a + b.totalSoldQuantity * b.bottleSize * b.alcoholContent / 100, 0)

  return (
    <>
      <h2>Statistiques</h2>
      <h3>Bars</h3>
      <table>
        <tr>
          <th>Bières vendues</th>
          <td>{soldQuantity} / {totalQuantity}</td>
        </tr>
        <tr>
          <th>Volume vendu</th>
          <td>{toVolume(soldVolume)} / {toVolume(totalVolume)}</td>
        </tr>
        <tr>
          <th>Éthanol consommé</th>
          <td>{toVolume(soldAlcohol)}</td>
        </tr>
        <tr>
          <th>Bénéfices estimés</th>
          <td>{toPrice(beerStats.estimatedProfit)}</td>
        </tr>
      </table>
      <p><small>1 hL = 100 L = 10 000 cL</small></p>

      <h3>Entrées</h3>
      <table>
        <tr>
          <th>Préventes vendues</th>
          <td>{entriesStat.totalSale}</td>
        </tr>
        <tr>
          <th>Personnes présentes</th>
          <td>{entriesStat.peopleCurrentParty}</td>
        </tr>
        <tr>
          <th>Bénéfices estimés</th>
          <td>{toPrice(entriesStat.totalSale * 4)} </td>
        </tr>
      </table>

      <h3>Final</h3>
      <table>
        <tr>
          <th>Bénéfice final estimé</th>
          <td>{toPrice(entriesStat.totalSale * 4)}   {toPrice(beerStats.estimatedProfit)} = <b>{toPrice((entriesStat.totalSale*4) + beerStats.estimatedProfit)}</b></td>
        </tr>
      </table>
    </>
  )
}
