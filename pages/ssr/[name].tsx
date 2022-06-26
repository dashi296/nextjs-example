import { pokemonClient } from '../../plugins/pokemon-ts'
import PokemonDetail from '../../components/PokemonDetail'
import { GetServerSideProps } from 'next'
import { Pokemon } from 'pokenode-ts'

type Props = {
  pokemon: Pokemon
}

const SSRPokemonDetailPage = ({
  pokemon
}: Props) => {

  return (
    <PokemonDetail
      pokemon={pokemon}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const name = query.name as string
  const pokemon = await pokemonClient.getPokemonByName(name)

  return {
    props: {
      pokemon
    }
  }
}

export default SSRPokemonDetailPage