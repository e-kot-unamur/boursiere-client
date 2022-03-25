import { useState } from 'preact/hooks'
import { BeerOrder, orderBeers, useBeers, User } from '../api'
import '../css/order.css'
import { useIntUrlFragment } from '../hooks'
import trashIcon from '../images/trash.png'
import { roundPrice, toPrice } from '../locales'
import { dispatchError } from './AlertBox'
import { OrderCard } from './OrderCard'

interface HistoryEntry {
  text: string,
  total: number,
  orders: BeerOrder[],
}

interface Props {
  user: User
}

export function OrderTable(props: Props) {
  const barId = useIntUrlFragment()
  const [beers, setBeers] = useBeers(barId)
  const [history, setHistory] = useState<HistoryEntry[]>([])

  const total = beers.reduce((a, b) => a + b.orderedQuantity * roundPrice(b.sellingPrice), 0)

  const handleInput = (id: number, orderedQuantity: number) => {
    setBeers(beers.map(b => b.id === id ? { ...b, orderedQuantity } : b))
  }

  const handleSubmit = async () => {
    const orderedBeers = beers.filter(b => b.orderedQuantity !== 0)
    const orders = orderedBeers.map(b => ({ id: b.id, orderedQuantity: b.orderedQuantity }))
    try {
      await orderBeers(props.user.token, orders)
      handleReset()
      setHistory([{
        text: orderedBeers.map(b => `${b.orderedQuantity} ${b.name}`).join(', '),
        total,
        orders,
      }, ...history.slice(0, 4)])
    } catch (err) {
      dispatchError(err as Error)
    }
  }

  const handleCancel = async (orders: BeerOrder[]) => {
    const oppositeOrders = orders.map(o => ({ ...o, orderedQuantity: -o.orderedQuantity }))
    try {
      await orderBeers(props.user.token, oppositeOrders)
      setHistory(history.filter(e => e.orders !== orders))
    } catch (err) {
      dispatchError(err as Error)
    }
  }

  const handleReset = () => {
    setBeers(beers.map(b => ({ ...b, orderedQuantity: 0 })))
  }

  return (
    <>
      <p>
        <button onClick={handleReset}>Annuler</button>
        <button onClick={handleSubmit}>Commander</button>
        <span><strong>Total</strong>&nbsp;: {toPrice(total)}</span>
      </p>
      <div class="orders">
        {beers.map(b => (
          <OrderCard key={b.id} beer={b} onInput={handleInput} />
        ))}
      </div>
      <ul>
        {history.map(h => (
          <li key={h.orders}>
            <span>{h.text} ({toPrice(h.total)})</span>
            {' '}
            <button onClick={() => handleCancel(h.orders)}>
              <img src={trashIcon} alt="Annuler" />
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
