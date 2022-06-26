import useSWR from 'swr'
import { useRouter } from 'next/router'
import { pokemonClient } from '../../plugins/pokemon-ts'

const fetcher = (name: string) => pokemonClient.getPokemonByName(name)

const CSRPokemonDetailPage = () => {
  const router = useRouter()
  const name = router.query.name as string

  const { data, error } = useSWR(`/api/pokemon/${name}`, () => fetcher(name))

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <p>name: {data.name}</p>
  )
}

export default CSRPokemonDetailPage
