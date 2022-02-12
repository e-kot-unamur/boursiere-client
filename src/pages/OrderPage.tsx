import { useEffect, useState } from 'preact/hooks'
import { Beer, getBeers, orderBeers, User } from '../api'
import { OrderCard } from '../components/OrderCard'
import { roundPrice, toPrice } from '../locales'
import '../css/order.css'

export interface BeerOrder extends Beer {
  orderedQuantity: number
}

interface Props {
  user: User
}

export function OrderPage(props: Props) {
  const [beers, setBeers] = useState<BeerOrder[]>([])

  useEffect(() => {
    getBeers().then(beers => setBeers(beers.map(b => ({ ...b, orderedQuantity: 0 }))))
  }, [])

  const handleInput = (id: number, orderedQuantity: number) => {
    setBeers(beers.map(b => b.id === id ? { ...b, orderedQuantity } : b))
  }

  const handleClick = async () => {
    const orders = beers
      .map(b => ({ id: b.id, orderedQuantity: b.orderedQuantity }))
      .filter(b => b.orderedQuantity !== 0)
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
