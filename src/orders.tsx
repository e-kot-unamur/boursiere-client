import { render } from 'preact'
import { OrderPage } from './pages/OrderPage'
import { UserProvider } from './components/UserProvider'
import './css/global.css'

render(<UserProvider page={OrderPage} />, document.getElementById('app')!)
