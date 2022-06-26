import useSWR from 'swr'
import { useRouter } from 'next/router'
import { pokemonClient } from '../../plugins/pokemon-ts'
import PokemonDetail from '../../components/PokemonDetail'
import FormattedDate from '../../components/FormattedDate'

const fetcher = (name: string) => pokemonClient.getPokemonByName(name)

const CSRPokemonDetailPage = () => {
  const router = useRouter()
  const name = router.query.name as string

  const { data: pokemon, error } = useSWR(`/api/pokemons/${name}`, () => fetcher(name))

  if (error) return <div>Failed to load</div>
  if (!pokemon) return <div>Loading...</div>

  const created = new Date()

  return (
    <>
      <PokemonDetail
        pokemon={pokemon}
      />
      <FormattedDate date={created} />
    </>
  )
}

export default CSRPokemonDetailPage
