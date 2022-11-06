import {useState} from "preact/hooks";
import {createEntry, User} from "../api";
import {dispatchError} from "./AlertBox";
import {JSX} from "preact";

interface Props {
  user: User
}

export function EntriesCard(props : Props) {
  let [value, setValue] = useState<number>(0);

  const handleInput = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    setValue(() => e.currentTarget.valueAsNumber)
  }

  const handleSubmit = async () => {
    try {
      await createEntry(props.user.token, {orderedQuantity: value})
      setValue(() => 0)
    } catch (err) {
      dispatchError(err as Error)
    }

  }

  const handleIncrement = () => {
    setValue(() => value+1)
  }

  const handleDecrement = () => {
    setValue(() => value-1)
  }

  return (
    <>
      <div class="order">
        <div>Entrée (4€)</div>
        <span className="counter">
          <button onClick={handleDecrement}>
            &minus;
          </button>
          <input
            type="number"
            value={value}
            onInput={handleInput}
          />
          <button onClick={handleIncrement}>
            +
          </button>
        </span>
      </div>
      <button onClick={handleSubmit}>Encoder la vente</button>
    </>
  )
}
