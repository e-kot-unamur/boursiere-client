export interface Status {
  nextPeriod: number
}

export interface Beer {
	id: number
	barId: number
	name: string
	stockQuantity: number
	totalSoldQuantity: number
	sellingPrice: number
  previousSellingPrice: number
	alcoholContent: number
}

export interface BeerOrder {
  id: number
  orderedQuantity: number
}

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

export interface Statistics {
  estimatedProfit: number
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
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

  return data as Beer[]
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

  return data as Beer[]
}

export async function orderBeers(token: string, orders: BeerOrder[]) {
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
