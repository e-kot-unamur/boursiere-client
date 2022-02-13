import { useEffect, useState } from 'preact/hooks'
import { getStatistics, Statistics, useBeers, User } from '../api'
import { toVolume, toPrice } from '../locales'

interface Props {
  user: User
}

export function AdminStats(props: Props) {
  const [beers, _] = useBeers()
  const [stats, setStats] = useState<Statistics>({ estimatedProfit: 0 })

  useEffect(() => {
    getStatistics(props.user.token).then(setStats)
  }, [props.user.token, beers])

  const totalQuantity = beers.reduce((a, b) => a + b.stockQuantity, 0)
  const soldQuantity = beers.reduce((a, b) => a + b.totalSoldQuantity, 0)
  const totalVolume = beers.reduce((a, b) => a + b.stockQuantity * b.bottleSize, 0)
  const soldVolume = beers.reduce((a, b) => a + b.totalSoldQuantity * b.bottleSize, 0)
  const soldAlcohol = beers.reduce((a, b) => a + b.totalSoldQuantity * b.bottleSize * b.alcoholContent / 100, 0)

  return (
    <>
      <h2>Statistiques</h2>
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
          <td>{toPrice(stats.estimatedProfit)}</td>
        </tr>
      </table>
      <p><small>1 hL = 100 L = 10 000 cL</small></p>
    </>
  )
}
