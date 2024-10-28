import { render } from 'preact'
import { UserProvider } from './components/UserProvider'
import './css/global.css'
import {EntriesPage} from "./pages/EntriesPage";
import {BeerPage} from "./pages/BeerPage";

render(<UserProvider page={EntriesPage} />, document.getElementById('app')!)
