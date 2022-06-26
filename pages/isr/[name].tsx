import { pokemonClient } from '../../plugins/pokemon-ts'
import PokemonDetail from '../../components/PokemonDetail'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Pokemon } from 'pokenode-ts'

type Props = {
  pokemon: Pokemon
}

const ISRPokemonDetailPage = ({
  pokemon
}: Props) => {

  return (
    <PokemonDetail
      pokemon={pokemon}
    />
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const name = params!.name as string
  const pokemon = await pokemonClient.getPokemonByName(name)

  return {
    props: {
      pokemon
    },
    revalidate: 10
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemonsResourceList = await pokemonClient.listPokemons(0, 151)
  const pokemons = pokemonsResourceList.results

  const paths = pokemons.map(pokemon => ({
    params: {
      name: pokemon.name
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export default ISRPokemonDetailPage