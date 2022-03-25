import type { Beer } from '../api'
import { CounterInput } from './CounterInput'

interface Props {
  beer: Beer
  onInput: (beerId: number, quantity: number) => void
}

export function OrderCard(props: Props) {
  const handleInput = (value: number) => {
    props.onInput(props.beer.id, value)
  }

  return (
    <div class="order">
      <div>{props.beer.name}</div>
      <CounterInput
        value={props.beer.orderedQuantity}
        onInput={handleInput}
      />
    </div>
  )
}
