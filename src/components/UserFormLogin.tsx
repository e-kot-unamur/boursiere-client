import { useState } from 'preact/hooks'
import { login, User, UserFormData } from '../api'
import { AlertBox } from './AlertBox'
import { UserForm } from './UserForm'

interface Props {
  onLogin: (user: User) => void
}

export function UserFormLogin(props: Props) {
  const [error, setError] = useState('')

  const handleSubmit = async (data: UserFormData) => {
    try {
      const user = await login(data.name, data.password)
      props.onLogin(user)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const handleCancel = () => {
    location.assign('/')
  }

  return (
    <div class="overlay shadow">
      <AlertBox>{error}</AlertBox>
      <div class="modal">
        <h1>Connexion</h1>
        <p>Veuillez vous connecter afin d'accéder à cette page.</p>
        <UserForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  )
}
