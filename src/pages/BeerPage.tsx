import { AlertBox } from '../components/AlertBox'
import { BeerFooter } from '../components/BeerFooter'
import { BeerTable } from '../components/BeerTable'
import { BeerTimer } from '../components/BeerTimer'

export function BeerPage() {
  return (
    <>
      <AlertBox />
      <BeerTimer />
      <BeerTable />
      <BeerFooter />
    </>
  )
}
