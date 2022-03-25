import { Beer, useBeers } from '../api'
import { useIntUrlFragment } from '../hooks'
import { toAlcoholContent, toVolume, toRoundedPrice, roundPrice } from '../locales'

export function BeerTable() {
  const barId = useIntUrlFragment()
  const [beers, _] = useBeers(barId)

  const minPrice = Math.min(...beers.map(b => b.sellingPrice))
  const mostWorth = Math.max(...beers.map(b => b.alcoholPerEuro))

  return (
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Alcool</th>
          <th>Prix</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        {beers.filter(b => b.stockQuantity > b.totalSoldQuantity).map(b => (
          <tr key={b.id}>
            <td>
              {b.sellingPrice === minPrice && '💸 '}
              {b.alcoholPerEuro == mostWorth && '🚀 '}
              {b.name} {toVolume(b.bottleSize)}
            </td>
            <td>
              {toAlcoholContent(b.alcoholContent)}
            </td>
            <td>
              {toRoundedPrice(b.sellingPrice)}
              {toTrend(b)}
            </td>
            <td>
              {b.stockQuantity - b.totalSoldQuantity}/{b.stockQuantity}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function toTrend(b: Beer): string {
  const priceIncrease = roundPrice(b.sellingPrice) - roundPrice(b.previousSellingPrice)
  if (priceIncrease > 0) {
    return ' ↗️'
  } else if (priceIncrease < 0) {
    return ' ↘️'
  } else {
    return ''
  }
}
