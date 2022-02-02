import type { JSX } from 'preact'
import { useState } from 'preact/hooks'
import type { UserFormData } from '../api'

interface Props {
  name?: string
  admin?: boolean
  passwordRequired?: boolean
  onSubmit: (user: UserFormData) => void
  onCancel: () => void
}

export function UserForm(props: Props) {
  const [name, setName] = useState(props.name ?? '')
  const [password, setPassword] = useState('')
  const [admin, setAdmin] = useState(props.admin ?? false)

  const handleSubmit = (e: JSX.TargetedEvent<HTMLElement>) => {
    e.preventDefault()
    props.onSubmit({ name, password, admin })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onInput={e => setName(e.currentTarget.value)}
        placeholder="Nom d'utilisateur"
        required
        minLength={3}
        maxLength={256}
        pattern="[A-Za-z0-9]*"
      />
      <input
        type="password"
        value={password}
        onInput={e => setPassword(e.currentTarget.value)}
        placeholder="Mot de passe"
        required={props.passwordRequired ?? true}
        minLength={3}
        maxLength={256}
      />
      {props.admin !== undefined && (
        <label>
          <input
            type="checkbox"
            checked={admin}
            onInput={e => setAdmin(e.currentTarget.checked)}
          /> Administrateur
        </label>
      )}
      <p>
        <button type="button" onClick={props.onCancel}>Annuler</button>
        <button type="submit">Confirmer</button>
      </p>
    </form>
  )
}
