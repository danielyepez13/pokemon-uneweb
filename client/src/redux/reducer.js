import { filterByType, filterByOrigin, sortAlphabetically, sortAttack, allFiltersAndSortings } from "../utils/filtersAndSorts";
const initialState = {
    myPokemons: [],
    pokemonFiltered: [],
    types: [],
    detailPokemon: {},
    pokemonTeam: [],
    idMembers: [],
    currentPage: 1,
    perPage: 12
}

let orderAlph = null;
let orderAtk = null;
let type = null;
let origin = null;

let firstOrder = null;
let secondOrder = null;

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_POKS': {
            const [pokesApi, pokesBD] = action.payload
            return {
                ...state,
                myPokemons: [...pokesApi, ...pokesBD],
                pokemonFiltered: [...pokesApi, ...pokesBD]
            }
        }

        case 'GET_TYPES': {
            return {
                ...state,
                types: action.payload
            }
        }

        case "SET_CURRENT_PAGE": {
            return {
                ...state,
                currentPage: action.payload
            }
        }

        case "FILTER_TYPES": {
            let myPokemons = [...state.myPokemons]
            let filterResults = []

            if(origin) {
                myPokemons = filterByOrigin(myPokemons, origin)
            }

            if (type !== action.payload) {
                filterResults = filterByType(myPokemons, action.payload);
            }

            type = action.payload
            return {
                ...state,
                pokemonFiltered: filterResults,
                currentPage: 1
            }
        }

        case "FILTER_ORIGIN": {
            let filterResults = [...state.myPokemons];
            origin = action.payload;

            if (type) {
                filterResults = filterByType(filterResults, type);
            }

            filterResults = filterByOrigin(filterResults, origin);

            return {
                ...state,
                pokemonFiltered: filterResults,
                currentPage: 1
            }
        }

        case "ORDER_ATK": {
            let filterResults = [...state.pokemonFiltered];
            filterResults = sortAttack(filterResults, action.payload, orderAlph);
            if((action.payload === "ASC" || action.payload === "DESC") && !orderAlph) {
                orderAtk = action.payload;
            }
            if (!firstOrder) firstOrder = "ATQ";
            else if (!secondOrder && firstOrder !== "ATQ") {
                secondOrder = "ATQ";
            }
            return {
                ...state,
                pokemonFiltered: filterResults,
            }
        }
        
        case "ORDER_ALPH": {
            let filterResults = [...state.pokemonFiltered];
            filterResults = sortAlphabetically(filterResults, action.payload, orderAtk);
            if ((action.payload === "A-Z" || action.payload === "Z-A") && !orderAlph) {
                orderAlph = action.payload;
            }
            if (!firstOrder) firstOrder = "ALF";
            else if (!secondOrder && firstOrder !== "ALF") {
                secondOrder = "ALF";
            }
            return {
                ...state,
                pokemonFiltered: filterResults,
            }
        }

        case "GET_DETAIL": {
            return {
                ...state,
                detailPokemon: action.payload
            }
        }

        case "GET_NAME": {
            let endResult = [...state.myPokemons];
            let [pokemonApi, pokemonBD] = action.payload;
            if(type){
                type = pokemonApi.types[0].name;
            }
            endResult.map(pokemon => {
                pokemon.selected = false;
                return pokemon;
            })
            
            pokemonApi.selected = true;

            if (endResult.find(pokemon => pokemon.id === pokemonApi.id)) {
                endResult = endResult.filter(pokemon => pokemon.id !== pokemonApi.id);
                endResult.unshift(pokemonApi);
            } else {
                endResult.unshift(pokemonApi);
            }

            if (pokemonBD) {
                pokemonBD.selected = true;
                endResult = endResult.filter(pokemon => pokemon.id !== pokemonBD.id);
                endResult.unshift(pokemonBD);
            }

            let endResultFiltered = allFiltersAndSortings(endResult, type, origin, orderAlph, orderAtk, firstOrder, secondOrder, pokemonApi);

            return {
                ...state,
                myPokemons: endResult,
                pokemonFiltered: endResultFiltered,
                currentPage: 1
            }
        }

        case "SET_POKEMON": {
            const allPokemons = [...state.myPokemons];
            const pokemonAdded = action.payload
            allPokemons.push(pokemonAdded);
            let filteredEndResult = allFiltersAndSortings(allPokemons, type, origin, orderAlph, orderAtk, firstOrder, secondOrder, pokemonAdded);
            if(type){
                type = pokemonAdded.types[0].name;
            }
            return {
                ...state,
                myPokemons: allPokemons,
                pokemonFiltered: filteredEndResult,
                currentPage: 1,
                msg_success: true,
            }
        }

        case "UPDATE_POKEMON": {
            const pokemonUpdated = action.payload;
            const allPokemons = [...state.myPokemons];
            let endResult = allPokemons.filter(pokemon => pokemon.id !== pokemonUpdated.id);
            endResult.push(pokemonUpdated);
            if(type){
                type = pokemonUpdated.types[0].name;
            }
            let filteredEndResult = allFiltersAndSortings(endResult, type, origin, orderAlph, orderAtk, firstOrder, secondOrder, pokemonUpdated);

            return {
                ...state,
                myPokemons: endResult,
                pokemonFiltered: filteredEndResult,
                currentPage: 1,
                msg_success: true,
            }
        }   

        case "GENERATE_TEAM": {
            let pokemonRepeated = [];
            let typesRepeated = [];
            let team = [];
            let idMembers = [];
            if (state.myPokemons.length > 0) {
                for (let i = 0; i < 6; i++) {
                    let random = Math.floor(Math.random() * state.myPokemons.length);
                    let pokemonSelected = state.myPokemons[random];
                    let typePokemonSelected = pokemonSelected.types[0].name;

                    if (pokemonRepeated.includes(pokemonSelected) || typesRepeated.includes(typePokemonSelected)) {
                        i--
                    } else {
                        team.push(pokemonSelected)
                        pokemonRepeated.push(pokemonSelected)
                        typesRepeated.push(typePokemonSelected)
                        idMembers.push(pokemonSelected.id)
                    }
                }
            }

            return {
                ...state,
                pokemonTeam: team,
                idMembers
            }
        }

        case "DELETE_POKEMON": {
            const allPokemons = [...state.myPokemons];
            let endResult = allPokemons.filter(pokemon => pokemon.id !== action.payload)
            let endResultFiltered = [...endResult]
            if (type || origin || orderAlph || orderAtk) {
                if (type) {
                    endResultFiltered = endResultFiltered.filter(pokemon => {
                        return pokemon.types.find(t => t.nombre === type)
                    })
                }
                if (origin) {
                    if (origin === "API") {
                        endResultFiltered = endResultFiltered.filter(pokemon => {
                            return !isNaN(Number(pokemon.id))
                        })
                    } else {
                        endResultFiltered = endResultFiltered.filter(pokemon => {
                            return isNaN(Number(pokemon.id))
                        })
                    }
                }

                if (firstOrder || secondOrder) {
                    if (firstOrder === "ATQ") {
                        if (orderAtk === "ASC") {
                            endResultFiltered.sort((a, b) => a.stat.ataque - b.stat.ataque);
                        } else if (orderAtk === "DESC") {
                            endResultFiltered.sort((a, b) => b.stat.ataque - a.stat.ataque);
                        }
                    } else if (firstOrder === "ALF") {
                        if (orderAlph === "A-Z") {
                            endResultFiltered.sort((a, b) => a.nombre.localeCompare(b.nombre));
                        } else if (orderAlph === "Z-A") {
                            endResultFiltered.sort((a, b) => b.nombre.localeCompare(a.nombre));
                        }
                    }

                    if (secondOrder === "ATQ") {
                        endResultFiltered.sort((a, b) => {
                            if (a.nombre === b.nombre) {
                                return (orderAtk === "ASC") ? a.stat.ataque - b.stat.ataque : b.stat.ataque - a.stat.ataque;
                            }
                            return 0;
                        });
                    } else if (secondOrder === "ALF") {
                        endResultFiltered.sort((a, b) => {
                            if (a.stat.ataque === b.stat.ataque) {
                                return (orderAlph === "A-Z") ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre);
                            }
                            return 0;
                        });
                    }
                }
            }
            return {
                ...state,
                myPokemons: endResult,
                pokemonFiltered: endResultFiltered,
                currentPage: 1,
                deleteSuccess: true,
            }
        }

        case "ERROR_ALERT": {
            const [alert, message] = action.payload;
            return {
                ...state,
                [alert]: message
            }
        }

        case "RESET_DETAIL": {
            return {
                ...state,
                detailPokemon: {}
            }
        }

        case "RESET_FILTERS": {
            orderAlph = null;
            orderAtk = null;
            type = null;
            origin = null;

            firstOrder = null;
            secondOrder = null;
            return {
                ...state,
                pokemonFiltered: state.myPokemons,
                currentPage: 1
            }
        }

        case "RESET_ALERT": {
            return {
                ...state,
                [action.payload]: null
            }
        }

        case "ENABLE_ADD": {
            return {
                ...state,
                enableAdd: action.payload
            }
        }

        case "ADD_EQUIPO": {
            const pokemon = [...state.myPokemons].find(pokes => pokes.id === action.payload);
            return {
                ...state,
                idMembers: [...state.idMembers, action.payload],
                pokemonTeam: [...state.pokemonTeam, pokemon]
            }
        }

        case "DELETE_EQUIPO": {
            return {
                ...state,
                idMembers: [...state.idMembers].filter(pokemonId => pokemonId !== action.payload),
                pokemonTeam: [...state.pokemonTeam].filter(poke => poke.id !== action.payload)
            }
        }

        default: return {
            ...state
        }
    }
}

export default rootReducer;