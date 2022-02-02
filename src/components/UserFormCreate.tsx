import { createUser, User, UserFormData } from '../api'
import { UserForm } from './UserForm'

interface Props {
  token: string
  onCreate: (user: User) => void
  onCancel: () => void
}

export function UserFormCreate(props: Props) {
  const handleSubmit = async (data: UserFormData) => {
    try {
      const user = await createUser(props.token, data)
      props.onCreate(user)
    } catch (err) {
      // TODO
    }
  }

  return (
    <div class="overlay shadow">
      <div class="modal">
        <h2>Nouvel utilisateur</h2>
        <p>Le nom doit contenir au moins 3 caractères alphanumériques.</p>
        <UserForm admin={false} onSubmit={handleSubmit} onCancel={props.onCancel} />
      </div>
    </div>
  )
}
