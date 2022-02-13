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
      <p>
        Vous pouvez charger les différentes bières dans le système en
        téléchargeant ci-dessous un fichier CSV. Si nécessaire, un <a
          href="https://github.com/e-kot-unamur/boursiere-server/raw/main/doc/beers.ods"
          download
        >template</a> est disponible sur GitHub.
      </p>
      <p>
        Attention, charger un fichier <strong>remplace l'ensemble des bières
        déjà existantes</strong> et <strong>supprime tout l'historique des
        ventes et des prix</strong> !
      </p>
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
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject()
    reader.onabort = () => reject()
    reader.readAsText(file)
  })
}
