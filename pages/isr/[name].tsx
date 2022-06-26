import { pokemonClient } from '../../plugins/pokemon-ts'
import PokemonDetail from '../../components/PokemonDetail'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Pokemon } from 'pokenode-ts'
import FormattedDate from '../../components/FormattedDate'

type Props = {
  pokemon: Pokemon
  created: string
}

const ISRPokemonDetailPage = ({
  pokemon,
  created
}: Props) => {

  return (
    <>
      <PokemonDetail
        pokemon={pokemon}
      />
      <FormattedDate date={created} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const name = params!.name as string
  const pokemon = await pokemonClient.getPokemonByName(name)
  const created = new Date().toISOString()

  return {
    props: {
      pokemon,
      created
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