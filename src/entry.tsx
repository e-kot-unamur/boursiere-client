import { render } from 'preact'
import { UserProvider } from './components/UserProvider'
import './css/global.css'
import {EntriesOrder} from "./components/EntriesOrder";

render(<UserProvider page={EntriesOrder} />, document.getElementById('app')!)
