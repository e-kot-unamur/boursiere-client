import type { Beer } from '../api'
import { CounterInput } from './CounterInput'
import {toRoundedPrice} from "../locales";
import {useState} from "preact/hooks";
import {createEntry, createUser, User} from "../api";
import {dispatchError} from "./AlertBox";

interface Props {
  user: User
}

export function EntriesCard(props : Props) {
  let [value, setValue] = useState<number>(0);

  const handleSubmit = async () => {
    try {
      await createEntry(props.user.token, {orderedQuantity: value})
      setValue(() => 0)
    } catch (err) {
      dispatchError(err as Error)
    }

  }

  const handleIncrement = () => {
    setValue(values => value+1)
  }

  const handleDecrement = () => {
    setValue(values => value-1)
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
