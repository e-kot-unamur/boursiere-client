import { logout, User } from '../api'
import exitIcon from '../images/exit.png'

interface Props {
  user: User
}

export function UserHeader(props: Props) {
  const handleClick = async () => {
    try {
      await logout(props.user.token)
    } catch (err) {
      // TODO
    }
  }

  return (
    <header>
      <button>
        {props.user.name}
      </button>
      <button onClick={handleClick}>
        <img src={exitIcon} alt="Déconnexion" />
      </button>
    </header>
  )
}
