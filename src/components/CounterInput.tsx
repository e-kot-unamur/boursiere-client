import type { JSX } from 'preact'

interface Props {
  value: number
  onInput: (value: number) => void
}

export function CounterInput(props: Props) {
  const handleInput = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    props.onInput(e.currentTarget.valueAsNumber)
  }

  const handleIncrement = () => {
    props.onInput(props.value + 1)
  }

  const handleDecrement = () => {
    props.onInput(props.value - 1)
  }

  return (
    <span class="counter">
      <button onClick={handleDecrement}>
        &minus;
      </button>
      <input
        type="number"
        value={props.value}
        onInput={handleInput}
      />
      <button onClick={handleIncrement}>
        +
      </button>
    </span>
  )
}
