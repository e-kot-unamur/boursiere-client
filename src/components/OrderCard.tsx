import type { JSX } from 'preact'
import type { BeerOrder } from '../pages/OrderPage'

interface Props {
  beer: BeerOrder
  onInput: (beerId: number, quantity: number) => void
}

export function OrderCard(props: Props) {
  const b = props.beer

  const handleIncrement = () => {
    props.onInput(b.id, b.orderedQuantity + 1)
  }

  const handleDecrement = () => {
    props.onInput(b.id, b.orderedQuantity - 1)
  }

  const handleInput = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    props.onInput(b.id, e.currentTarget.valueAsNumber)
  }

  return (
    <div class="order">
      <div>{b.name}</div>
      <div class="order-control">
        <button onClick={handleDecrement}>
          &minus;
        </button>
        <input
          type="number"
          value={b.orderedQuantity}
          onInput={handleInput}
        />
        <button onClick={handleIncrement}>
          +
        </button>
      </div>
    </div>
  )
}
