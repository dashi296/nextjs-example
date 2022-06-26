import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { NamedAPIResourceList } from 'pokenode-ts'
import { pokemonClient } from '../../plugins/pokemon-ts'

type Props = {
  pokemonsResourceList: NamedAPIResourceList
}

const SSRPokemonsPage = ({
  pokemonsResourceList
}: Props) => {

  const pokemons = pokemonsResourceList.results

  return (
    <ul className="p-2">
      {
        pokemons.map(pokemon => (
          <li key={pokemon.name}>
            <Link href={`/ssr/${pokemon.name}`}>
              {pokemon.name}
            </Link>
          </li>
        ))
      }
    </ul>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const pokemonsResourceList = await pokemonClient.listPokemons(0, 151)

  return {
    props: {
      pokemonsResourceList
    }
  }
}

export default SSRPokemonsPage