import { useEffect, useState } from 'preact/hooks'
import { dispatchError } from './components/AlertBox'
import { useEvents } from './hooks'

export interface Beer {
  id: number
  barId: number
  name: string
  stockQuantity: number
  totalSoldQuantity: number
  sellingPrice: number
  previousSellingPrice: number
  bottleSize: number
  alcoholContent: number

  // The following fields are not present on the server, they are created and
  // used by the client only.
  alcoholPerEuro: number
  orderedQuantity: number
}

export interface BeerOrder {
  id: number
  orderedQuantity: number
}

export type BeerEvent =
  | { type: 'update', data: Beer[] }
  | { type: 'order', data: BeerOrder[] }

export interface User {
  id: number
  name: string
  admin: boolean
  token: string
}

export interface UserFormData {
  name: string
  password: string
  admin: boolean
}

export interface Entries {
  id: number
  timestamp : number
  orderedQuantity : number
  endOfParty : boolean
}

export interface EntriesOrder {
  orderedQuantity: number
}

export type EntriesEvent =
  | { type: 'update', data: Entries[] }
  | { type: 'order', data: EntriesOrder[] }

export interface EntriesFormData {
  orderedQuantity: number
}

export interface EndOfPartyFormData {
  orderedQuantity: number
  endOfParty : boolean
}

export interface Statistics {
  estimatedProfit: number
}

export interface EntriesStatistics {
  peopleCurrentParty: number
  totalSale : number
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ApiError"
  }
}

const host = import.meta.env.DEV
  ? 'http://localhost:8080'
  : ''

export async function login(name: string, password: string): Promise<User> {
  const response = await fetch(`${host}/api/users/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, password }),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new ApiError(data.error)
  }

  return data as User
}

export async function logout(token: string) {
  await fetch(`${host}/api/users/token`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Authorization': `Bearer ${token}` },
  })

  // We directly refresh the page here. Kind of a hack but it works.
  // We also ignore any ApiError to actually log the user out even if the token
  // doesn't exist server-side anymore. In that case, it would simply be
  // deleted client-side.
  // Finally, note that any NetworkError WONT be ignored. That's what we want.
  localStorage.removeItem('user')
  location.reload()
}

export async function getBeers(): Promise<Beer[]> {
  const response = await fetch(`${host}/api/beers`)

  const data = await response.json()
  if (!response.ok) {
    throw new ApiError(data.error)
  }

  return (data as Beer[]).map(b => ({
    ...b,
    alcoholPerEuro: b.alcoholContent * b.bottleSize / b.sellingPrice,
    orderedQuantity: 0,
  }))
}

export async function setBeers(token: string, body: string): Promise<Beer[]> {
  const response = await fetch(`${host}/api/beers`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'text/csv',
      'Authorization': `Bearer ${token}`,
    },
    body,
  })

  const data = await response.json()
  if (!response.ok) {
    throw new ApiError(data.error)
  }

  return (data as Beer[]).map(b => ({ ...b, orderedQuantity: 0 }))
}

export function useBeers(barId?: number): [Beer[], (newValue: Beer[]) => void] {
  const [beers, setBeers] = useState<Beer[]>([])

  useEffect(() => {
    getBeers()
      .then(beers => setBeers(beers.filter(b => barId === undefined || b.barId === barId)))
      .catch(dispatchError)
  }, [barId])

  useEvents(`${host}/api/beers/events`, (e: BeerEvent) => {
    switch (e.type) {
      case 'update':
        setBeers(beers => e.data
          .map(b => {
            const previous = beers.find(p => p.id === b.id)
            return {
              ...b,
              alcoholPerEuro: b.alcoholContent * b.bottleSize / b.sellingPrice,
              orderedQuantity: previous === undefined ? 0 : previous.orderedQuantity,
            }
          })
          .filter(b => barId === undefined || b.barId === barId))
        break

      case 'order':
        setBeers(beers => beers.map(b => {
          const order = e.data.find(o => o.id === b.id)
          return order === undefined
            ? b
            : { ...b, totalSoldQuantity: b.totalSoldQuantity + order.orderedQuantity }
        }))
        break
    }
  }, [barId])

  return [beers, setBeers]
}

export async function orderBeers(token: string, orders: BeerOrder[]) {
  console.log("orderBeers")
  console.log(orders)
  const response = await fetch(`${host}/api/beers/order`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(orders),
  })

  if (!response.ok) {
    const data = await response.json()
    throw new ApiError(data.error)
  }
}

export async function getStatistics(token: string): Promise<Statistics> {
  const response = await fetch(`${host}/api/beers/stats`, {
    credentials: 'include',
    headers: { 'Authorization': `Bearer ${token}` },
  })

  const data = await response.json()
  if (!response.ok) {
    throw new ApiError(data.error)
  }

  return data as Statistics
}

export async function getUsers(token: string): Promise<User[]> {
  const response = await fetch(`${host}/api/users`, {
    credentials: 'include',
    headers: { 'Authorization': `Bearer ${token}` },
  })

  const data = await response.json()
  if (!response.ok) {
    throw new ApiError(data.error)
  }

  return data as User[]
}

export async function createUser(token: string, user: UserFormData): Promise<User> {
  const response = await fetch(`${host}/api/users`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(user)
  })

  const data = await response.json()
  if (!response.ok) {
    throw new ApiError(data.error)
  }

  return data as User
}

export async function updateUser(token: string, id: number, user: UserFormData): Promise<User> {
  const response = await fetch(`${host}/api/users/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(user)
  })

  const data = await response.json()
  if (!response.ok) {
    throw new ApiError(data.error)
  }

  return data as User
}

export async function deleteUser(token: string, id: number) {
  const response = await fetch(`${host}/api/users/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Authorization': `Bearer ${token}` },
  })

  if (!response.ok) {
    const data = await response.json()
    throw new ApiError(data.error)
  }
}

// Test
export function useEntries(token : string): [Entries[], (newValue : Entries[]) => void] {
  let [entries, setEntries] = useState<Entries[]>([])

  useEffect(() => {
    getEntries(token)
      .then(e => setEntries(e.reverse()))
      .catch(dispatchError)
  }, [])


  useEvents(`${host}/api/entries/events`, (e: EntriesEvent) => {
    switch (e.type) {
      case 'update':
        setEntries(() => e.data.reverse())
        break

      case 'order':
        // @ts-ignore
        setEntries(() => e.data.reverse())
        break
    }
  }, [])


  return [entries, setEntries]
}

export async function getEntries(token: string): Promise<Entries[]> {
  const response = await fetch(`${host}/api/entries`, {
    credentials: 'include',
    headers: { 'Authorization': `Bearer ${token}` },
  })

  const data = await response.json()
  if (!response.ok) {
    throw new ApiError(data.error)
  }

  return data as Entries[]
}

export async function createEntry(token: string, quantity: EntriesFormData): Promise<Entries> {
  const response = await fetch(`${host}/api/entries`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(quantity)
  })

  const data = await response.json()
  if (!response.ok) {
    throw new ApiError(data.error)
  }

  return data as Entries
}

export async function createEndOfParty(token: string): Promise<Entries> {
  const body :EndOfPartyFormData = {endOfParty: true, orderedQuantity: -1}
  const response = await fetch(`${host}/api/entries`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body)
  })

  const data = await response.json()
  if (!response.ok) {
    throw new ApiError(data.error)
  }

  return data as Entries
}

export async function getEntriesStatistics(token: string): Promise<EntriesStatistics> {
  const response = await fetch(`${host}/api/entries/stat`, {
    credentials: 'include',
    headers: { 'Authorization': `Bearer ${token}` },
  })

  const data = await response.json()
  if (!response.ok) {
    throw new ApiError(data.error)
  }

  return data as EntriesStatistics
}
