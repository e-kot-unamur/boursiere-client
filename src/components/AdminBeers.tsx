import type { JSX } from 'preact'
import { setBeers, User } from '../api'

interface Props {
  user: User
}

export function AdminBeers(props: Props) {
  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault()
    const element = e.currentTarget.elements.namedItem('file') as HTMLInputElement
    const file = element.files?.[0]
    if (file !== undefined) {
      try {
        const csv = await readFile(file)
        await setBeers(props.user.token, csv)
        element.value = ''
      } catch (err) {
        // TODO
      }
    }
  }

  return (
    <>
      <h2>Bières</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" accept="text/csv" />
        <button type="submit">Charger</button>
      </form>
    </>
  )
}

async function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result as string))
    reader.addEventListener('error', () => reject())
    reader.readAsText(file)
  })
}
