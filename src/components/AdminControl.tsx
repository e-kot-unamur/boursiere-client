import type { JSX } from 'preact'
import { useState } from 'preact/hooks'
import type { User } from '../api'

interface Props {
  user: User
}

export function AdminControl(props: Props) {
  const [status, setStatus] = useState(0)

  let elements: JSX.Element[]
  if (status === 0) {
    elements = [
      <p>La boursière est en pause !</p>,
      <button onClick={() => setStatus(1)}>Reprendre</button>,
    ]
  } else if (status === 1) {
    elements = [
      <p>La boursière a commencé !</p>,
      <button onClick={() => setStatus(0)}>Pause</button>,
      <button onClick={() => setStatus(2)}>Terminer</button>,
    ]
  } else {
    elements = [
      <p>La boursière est terminée !</p>,
      <button onClick={() => setStatus(1)}>Reprendre</button>,
    ]
  }

  return (
    <>
      <h2>Gestion</h2>
      {elements}
    </>
  )
}
