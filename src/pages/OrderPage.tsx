import { useState } from 'preact/hooks'
import { useIntUrlFragment } from '../hooks'
import { orderBeers, useBeers, User } from '../api'
import { OrderCard } from '../components/OrderCard'
import { roundPrice, toPrice } from '../locales'
import '../css/order.css'

interface Props {
  user: User
}

export function OrderPage(props: Props) {
  const barId = useIntUrlFragment()
  const [beers, setBeers] = useBeers(barId)

  const handleInput = (id: number, orderedQuantity: number) => {
    setBeers(beers.map(b => b.id === id ? { ...b, orderedQuantity } : b))
  }

  const handleClick = async () => {
    const orders = beers
      .filter(b => b.orderedQuantity !== 0)
      .map(b => ({ id: b.id, orderedQuantity: b.orderedQuantity }))
    try {
      await orderBeers(props.user.token, orders)
      setBeers(beers.map(b => ({ ...b, orderedQuantity: 0 })))
    } catch (err) {
      // TODO
    }
  }

  const total = beers.reduce((a, b) => a + b.orderedQuantity * roundPrice(b.sellingPrice), 0)

  return (
    <>
      <div class="orders">
        {beers.map(b => (
          <OrderCard key={b.id} beer={b} onInput={handleInput} />
        ))}
      </div>
      <button onClick={handleClick}>Commander</button>
      <span>Total : {toPrice(total)}</span>
    </>
  )
}