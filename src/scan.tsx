import { render } from 'preact'
import './css/global.css'
import {ScanPage} from "./pages/ScanPage";
import {UserProvider} from "./components/UserProvider";

render(<UserProvider page={ScanPage}/>, document.getElementById('app')!)
