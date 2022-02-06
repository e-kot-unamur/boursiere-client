import { useState, useEffect } from 'preact/hooks'
import { Beer, BeerOrder, getBeers } from '../api'
import { toAlcoholContent, toVolume, toRoundedPrice, roundPrice } from '../locales'

type Message =
  | { type: 'update', data: Beer[] }
  | { type: 'order', data: BeerOrder[] }

export function BeerTable() {
  const [beers, setBeers] = useState<Beer[]>([])

  useEffect(() => {
    getBeers().then(setBeers)
  }, [])

  useEffect(() => {
    const source = new EventSource('http://localhost:8080/api/beers/events')

    const handleMessage = (e: MessageEvent) => {
      const msg = JSON.parse(e.data) as Message
      if (msg.type === 'update') {
        setBeers(msg.data)
      } else if (msg.type === 'order') {
        setBeers(beers => beers.map(b => {
          const order = msg.data.find(o => o.id === b.id)
          return order === undefined
            ? b
            : { ...b, totalSoldQuantity: b.totalSoldQuantity + order.orderedQuantity }
        }))
      }
    }

    source.addEventListener('message', handleMessage)
    return () => {
      source.removeEventListener('message', handleMessage)
      source.close()
    }
  }, [])

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
