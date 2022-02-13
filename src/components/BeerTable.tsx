import { Beer, useBeers } from '../api'
import { toAlcoholContent, toVolume, toRoundedPrice, roundPrice } from '../locales'

export function BeerTable() {
  const [beers, _] = useBeers()

  const minPrice = Math.min(...beers.map(b => b.sellingPrice))

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
        {beers.map(b => (
          <tr key={b.id}>
            <td>
              {b.name} {toVolume(b.bottleSize)}
            </td>
            <td>
              {toAlcoholContent(b.alcoholContent)}
            </td>
            <td>
              {toRoundedPrice(b.sellingPrice)}
              {toTrend(b)}
              {b.sellingPrice === minPrice && ' 💸'}
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
