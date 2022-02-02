import { render } from 'preact'
import { AdminPage } from './pages/AdminPage'
import { UserProvider } from './components/UserProvider'
import './css/global.css'

render(<UserProvider page={AdminPage} />, document.getElementById('app')!)
