import {Beer, User} from "../api";
import {InputTable} from "../components/InputTable";

interface Props {
  user: User
}

export function ScanPage(props: Props) {

  return (
    <>
      <p>Test</p>
      <InputTable user={props.user} />
    </>
  )
}
