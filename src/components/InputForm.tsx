import {h, JSX, render} from 'preact';
import { useState } from 'preact/hooks';
import {Beer} from "../api";

interface Props {
  onInput: (beerId: number, quantity: number) => void
}

export function KeyboardInput(props: Props) {
  const [inputValue, setInputValue] = useState('');
  const [lastScanValue, setLastScanValue] = useState('');
  const [quantityValue, setQuantityValue] = useState<number>(0);

  const handleInputChange = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const getId = () => {
    return 1
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      console.log('ENTER');
      console.log('quantity after enter : ' + quantityValue)
      if (lastScanValue === inputValue) {
        console.log('same beer')
        setQuantityValue(quantityValue+1)
        props.onInput(getId() ,quantityValue+1)
      } else {
        console.log('new beer')
        setQuantityValue(1)
        props.onInput(getId() ,1)
      }

      setLastScanValue(inputValue)

      console.log('quantity at the end : ' + quantityValue)

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
      <p>Nb de produit : {quantityValue}</p>
    </div>
  );
}

export default KeyboardInput;
