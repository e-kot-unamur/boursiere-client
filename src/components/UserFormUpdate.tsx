import { updateUser, User, UserFormData } from '../api'
import { UserForm } from './UserForm'

interface Props {
  token: string
  user: User
  onUpdate: (user: User) => void
  onCancel: () => void
}

export function UserFormUpdate(props: Props) {
  const handleSubmit = async (data: UserFormData) => {
    try {
      const user = await updateUser(props.token, props.user.id, data)
      props.onUpdate(user)
    } catch (err) {
      // TODO
    }
  }

  return (
    <div class="overlay shadow">
      <div className="modal">
        <h2>{props.user.name}</h2>
        <p>Le nom doit contenir au moins 3 caractères alphanumériques.</p>
        <p>Laissez le mot de passe vide si vous ne souhaitez pas le modifier.</p>
        <UserForm
          name={props.user.name}
          admin={props.user.admin}
          passwordRequired={false}
          onSubmit={handleSubmit}
          onCancel={props.onCancel}
        />
      </div>
    </div>
  )
}
