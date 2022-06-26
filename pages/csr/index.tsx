import useSWR from 'swr'
import { pokemonClient } from '../../plugins/pokemon-ts'

const fetcher = () => pokemonClient.listPokemons(0, 151)

const CSRPokemonsPage = () => {

  const { data, error } = useSWR('/api/profile-data', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const pokemons = data.results

  return (
    <ul>
      {
        pokemons.map(pokemon => <li>{pokemon.name}</li>)
      }
    </ul>
  )
}

export default CSRPokemonsPage
