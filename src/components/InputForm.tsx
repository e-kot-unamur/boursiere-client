import {h, JSX, render} from 'preact';
import { useState } from 'preact/hooks';
import {Beer} from "../api";

interface Props {
  onInput: (beerId: number, quantity: number) => void
}

export function KeyboardInput(props: Props) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      console.log('Touche ENTER détectée');
      // Faites ici ce que vous voulez lorsque la touche ENTER est pressée
      props.onInput(9, 1)
      setInputValue('')
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onInput={handleInputChange}
        onKeyUp={handleKeyUp}
        placeholder="Tapez ici"
      />
      <p>Vous avez tapé : {inputValue}</p>
    </div>
  );
}

export default KeyboardInput;
