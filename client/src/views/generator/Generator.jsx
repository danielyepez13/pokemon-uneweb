/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import Card from '../../components/card/Card';
import ButtonLink from "../../components/buttonLink/ButtonLink"
import Alerts from '../../components/alerts/Alerts';
import { teamGenerator, enableAdd, getPoks } from '../../redux/actions';
import "./Generator.css"

const Generator = () => {
  const dispatch = useDispatch();
  const team = useSelector(state => state.pokemonTeam);
  const allPokemons = useSelector(state => state.myPokemons);
  const enableAddState = useSelector(state => state.enableAdd);
  
  const generatorClick = () => {
    dispatch(teamGenerator());
  }

  const onActivo = () => {
    dispatch(enableAdd(true));
  }

  const onDesactivo = () => {
    dispatch(enableAdd(false));
  }

  useEffect(() => {
    if (!allPokemons.length) dispatch(getPoks())
  }, [dispatch])

  return (
    <div>
      <div className="button-options">
        <button onClick={generatorClick} className='btnGenerator'>Generate Team</button>
        {
          (!enableAddState) ? 
          <p>
              <button onClick={onActivo} className='btnAgregarIntegrante'>Activate option to Add manually</button>
          </p> :
          <p>
              <button onClick={onDesactivo} className='btnAgregarIntegrante'>Desactive option to Add manuall</button>
          </p>
        }
      </div>
      <div className="equipo">
        {
          team?.length > 0 &&
          team.map((pokemon, index) => {
            return (
              <Card
                key={index}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types}
                hp={pokemon.stat.hp}
                attack={pokemon.stat.attack}
                defense={pokemon.stat.defense}
                speed={pokemon.stat.speed}
              />
            )
          })
        }
      </div>
      <div className='teamOptions'>
        {
          team.length === 0 && (
            <div className='alertOptions'>
              {
               !enableAddState ?
                  (
                    <div className='equiposOpciones'>
                      <h3>You need to click the button to generate a <b>Team</b></h3>
                      <p>Or</p>
                      <h3>Enable the option to manually add 6 members</h3>
                    </div>
                  ) 
                  : 
                  (
                    <div>
                      You need to go to <ButtonLink name="Home" dir="/home" /> to add pokemon to the team
                    </div>
                  )
              }
            </div>
          )
        }

        <Alerts />

      </div>
    </div>
  )
}

export default Generator