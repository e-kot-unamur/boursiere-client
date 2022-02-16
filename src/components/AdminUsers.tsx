import type { JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { getUsers, User } from '../api'
import pencilIcon from '../images/pencil.png'
import trashIcon from '../images/trash.png'
import { dispatchError } from './AlertBox'
import { UserFormCreate } from './UserFormCreate'
import { UserFormDelete } from './UserFormDelete'
import { UserFormUpdate } from './UserFormUpdate'

interface Props {
  user: User
}

const enum ActionType {
  None,
  Create,
  Update,
  Delete,
}

type Action =
  | { type: ActionType.None }
  | { type: ActionType.Create }
  | { type: ActionType.Update, user: User }
  | { type: ActionType.Delete, user: User }

export function AdminUsers(props: Props) {
  const [users, setUsers] = useState<User[]>([])
  const [action, setAction] = useState<Action>({ type: ActionType.None })

  useEffect(() => {
    getUsers(props.user.token)
      .then(setUsers)
      .catch(dispatchError)
  }, [props.user.token])

  const handleCreate = (user: User) => {
    setUsers([...users, user])
    handleCancel()
  }

  const handleUpdate = (user: User) => {
    setUsers(users.map(u => u.id === user.id ? user : u))
    handleCancel()
  }

  const handleDelete = (id: number) => {
    setUsers(users.filter(u => u.id !== id))
    handleCancel()
  }

  const handleCancel = () => {
    setAction({ type: ActionType.None })
  }

  let form: JSX.Element | null = null
  if (action.type === ActionType.Create) {
    form = <UserFormCreate token={props.user.token} onCreate={handleCreate} onCancel={handleCancel} />
  } else if (action.type === ActionType.Update) {
    form = <UserFormUpdate token={props.user.token} user={action.user} onUpdate={handleUpdate} onCancel={handleCancel} />
  } else if (action.type === ActionType.Delete) {
    form = <UserFormDelete token={props.user.token} user={action.user} onDelete={handleDelete} onCancel={handleCancel} />
  }

  return (
    <>
      <h2>Utilisateurs</h2>
      {form}
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Administrateur</th>
            <th>Gestion</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}{u.id === props.user.id && ' (vous)'}</td>
              <td>{u.admin ? 'Oui' : 'Non'}</td>
              <td>
                <button onClick={() => setAction({ type: ActionType.Update, user: u })}>
                  <img src={pencilIcon} alt="Modifier" />
                </button>
                <button onClick={() => setAction({ type: ActionType.Delete, user: u })}>
                  <img src={trashIcon} alt="Supprimer" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setAction({ type: ActionType.Create })}>
        Créer
      </button>
    </>
  )
}
