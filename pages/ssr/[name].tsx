import { pokemonClient } from '../../plugins/pokemon-ts'
import PokemonDetail from '../../components/PokemonDetail'
import { GetServerSideProps } from 'next'
import { Pokemon } from 'pokenode-ts'
import FormattedDate from '../../components/FormattedDate'

type Props = {
  pokemon: Pokemon
  created: string
}

const SSRPokemonDetailPage = ({
  pokemon,
  created
}: Props) => {

  return (
    <>
      <PokemonDetail
        pokemon={pokemon}
      />
      <FormattedDate date={created}/>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const name = params!.name as string
  const pokemon = await pokemonClient.getPokemonByName(name)
  const created = new Date().toISOString()

  return {
    props: {
      pokemon,
      created
    }
  }
}

export default SSRPokemonDetailPage