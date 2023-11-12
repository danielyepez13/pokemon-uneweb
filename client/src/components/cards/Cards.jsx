/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getPoks, setCurrentPage } from "../../redux/actions";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import Filters from "../filters/Filters";
import Loader from "../loader/Loader";
import Alerts from "../alerts/Alerts";
import "./Cards.css";

const Cards = () => {
  // Dispatch and actions
  const dispatch = useDispatch()
  const pokemonState = useSelector(state => state.pokemonFiltered);

  // Section pagination
  const currentPage = useSelector(state => state.currentPage);
  const perPage = useSelector(state => state.perPage);

  const totalPokemons = pokemonState.length;
  const totalPages = Math.ceil(pokemonState.length / perPage)

  const indexOfLastPost = currentPage * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;
  const currentPokemons = pokemonState.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber))
  };

  const previousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1))
    }
    if( currentPage === 1 ){
      dispatch(setCurrentPage(totalPages))
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1))
    }
    if(currentPage === totalPages ){
      dispatch(setCurrentPage(1))
    }
  };

  useEffect(() => {
    if(!pokemonState.length) dispatch(getPoks())
  }, [])

  return (
    <div>
      <Filters />
      <div className="cards">
        {
          currentPokemons.length > 0 ?
          currentPokemons.map((pokemon, index) => {
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
                speed={pokemon.stat?.speed}
                selected={pokemon.selected ? pokemon.selected : false}
              />
            )
          }) : (
              <Loader />
          )
        }

      </div>
      {
        totalPokemons > perPage &&
        <Pagination perPage={perPage}
          totalPokes={totalPokemons}
          pagina={paginate}
          previa={previousPage}
          siguiente={nextPage}
          actual={currentPage}
        />
      }
      <Alerts />
    </div>
  )
}

export default Cards