import { login, User, UserFormData } from '../api'
import { dispatchError } from './AlertBox'
import { UserForm } from './UserForm'

interface Props {
  onLogin: (user: User) => void
}

export function UserFormLogin(props: Props) {
  const handleSubmit = async (data: UserFormData) => {
    try {
      const user = await login(data.name, data.password)
      props.onLogin(user)
    } catch (err) {
      dispatchError(err as Error)
    }
  }

  const handleCancel = () => {
    location.assign('/')
  }

  return (
    <div class="overlay shadow">
      <div class="modal">
        <h1>Connexion</h1>
        <p>Veuillez vous connecter afin d'accéder à cette page.</p>
        <UserForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  )
}
