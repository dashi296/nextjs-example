import Image from "next/image";
import { Pokemon } from "pokenode-ts";

type Props = {
  pokemon: Pokemon
}

const PokemonDetail = ({
  pokemon
}: Props) => {
  return (
    <div className="p-2">
      <div>
        <Image width={100} height={100} src={pokemon.sprites.front_default || ''} alt="" />
      </div>
      <dl>
        <dt>
          name: 
        </dt>
        <dd className="pl-4">
          {pokemon.name}
        </dd>
        <dt>
          types
        </dt>
        { pokemon.types.map(type => <dd className="pl-4" key={type.slot}>{type.type.name}</dd>) }
      </dl>
      <div>
        {`created: ${new Date().toLocaleTimeString('ja-JP')}`}
      </div>
    </div>
  )
}
export default PokemonDetail