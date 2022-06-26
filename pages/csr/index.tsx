import Link from 'next/link'
import useSWR from 'swr'
import { pokemonClient } from '../../plugins/pokemon-ts'

const fetcher = () => pokemonClient.listPokemons(0, 151)

const CSRPokemonsPage = () => {

  const { data, error } = useSWR('/api/pokemons', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const pokemons = data.results

  return (
    <ul className="p-2">
      {
        pokemons.map(pokemon => (
          <li key={pokemon.name}>
            <Link href={`/csr/${pokemon.name}`}>
              {pokemon.name}
            </Link>
          </li>
        ))
      }
    </ul>
  )
}

export default CSRPokemonsPage
