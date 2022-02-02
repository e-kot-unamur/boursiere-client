import { useEffect, useState } from 'preact/hooks'
import { Beer, getBeers, getStatistics, Statistics, User } from '../api'
import { toPrice } from '../locales'

interface Props {
  user: User
}

export function AdminStats(props: Props) {
  const [beers, setBeers] = useState<Beer[]>([])
  const [stats, setStats] = useState<Statistics>({ estimatedProfit: 0 })

  useEffect(() => {
    getBeers().then(setBeers)
  }, [])

  useEffect(() => {
    getStatistics(props.user.token).then(setStats)
  }, [props.user])

  const total = beers.reduce((a, b) => a + b.stockQuantity, 0)
  const sold = beers.reduce((a, b) => a + b.totalSoldQuantity, 0)

  return (
    <>
      <h2>Statistiques</h2>
      <table>
        <tr>
          <th>Bénéfices estimés</th>
          <td>{toPrice(stats.estimatedProfit)}</td>
        </tr>
        <tr>
          <th>Bières vendues</th>
          <td>{sold}</td>
        </tr>
        <tr>
          <th>Bières restantes</th>
          <td>{total - sold}/{total}</td>
        </tr>
      </table>
    </>
  )
}
