import useSWR from 'swr'
import { useRouter } from 'next/router'
import { pokemonClient } from '../../plugins/pokemon-ts'
import PokemonDetail from '../../components/PokemonDetail'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Pokemon } from 'pokenode-ts'
import FormattedDate from '../../components/FormattedDate'

type Props = {
  pokemon: Pokemon,
  created: string
}

const fetcher = async (name: string) => {
  const pokemon = await pokemonClient.getPokemonByName(name)
  const created = new Date().toISOString()
  return {
    pokemon,
    created
  }
}

const SGPokemonDetailPage = ({
  pokemon,
  created
}: Props) => {
  const router = useRouter()
  const name = router.query.name as string

  const { data, error } = useSWR(`/api/pokemons/${name}`, () => fetcher(name))

  const displayPokemon = data?.pokemon || pokemon
  const displayCreated = data?.created || created

  return (
    <>
      <PokemonDetail
        pokemon={displayPokemon}
      />
      <FormattedDate date={displayCreated}/>
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
    }
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
    fallback: false
  }
}

export default SGPokemonDetailPage