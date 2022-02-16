import { deleteUser, User } from "../api"
import { dispatchError } from "./AlertBox"

interface Props {
  token: string
  user: User
  onDelete: (id: number) => void
  onCancel: () => void
}

export function UserFormDelete(props: Props) {
  const handleSubmit = async () => {
    try {
      await deleteUser(props.token, props.user.id)
      props.onDelete(props.user.id)
    } catch (err) {
      dispatchError(err as Error)
    }
  }

  return (
    <div class="overlay shadow">
      <div class="modal">
        <h2>{props.user.name}</h2>
        <p>Êtes-vous certain de vouloir supprimer cet utilisateur ?</p>
        <button onClick={props.onCancel}>Non</button>
        <button onClick={handleSubmit}>Oui</button>
      </div>
    </div>
  )
}
