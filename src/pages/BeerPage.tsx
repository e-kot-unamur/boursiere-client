import { AlertBox } from '../components/AlertBox'
import { BeerTable } from '../components/BeerTable'
import { BeerTimer } from '../components/BeerTimer'

export function BeerPage() {
  return (
    <>
      <AlertBox />
      <BeerTimer />
      <BeerTable />
    </>
  )
}
