const URL = import.meta.env.VITE_URL_BACKEND
export const getPoks = () => async (dispatch) => {
    const response = await fetch(`${URL}pokemons/`)
    const result = await response.json();

    return dispatch({
        type: 'GET_POKS',
        payload: result,
    })
};

export const getTypes = () => async (dispatch) => {
    const response = await fetch(`${URL}types/`);
    const result = await response.json();

    return dispatch({
        type: 'GET_TYPES',
        payload: result,
    })
}

export const filterTypes = (value) => {
    return {
        type: "FILTER_TYPES",
        payload: value
    }
}

export const filterOrigin = (value) => {
    return {
        type: "FILTER_ORIGIN",
        payload: value
    }
}

export const orderAtk = (value) => {
    return {
        type: "ORDER_ATK",
        payload: value
    }
}

export const orderAlph = (value) => {
    return {
        type: "ORDER_ALPH",
        payload: value
    }
}

export const getDetail = (idPokemon) => async (dispatch) => {
    const response = await fetch(`${URL}pokemons/${idPokemon}`)
    const result = await response.json();

    return dispatch({
        type: 'GET_DETAIL',
        payload: result,
    })
}

export const getName = (name) => async (dispatch) => {
    try {
        const response = await fetch(`${URL}pokemons/name/?name=${name}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const result = await response.json();

        return dispatch({
            type: 'GET_NAME',
            payload: result,
        });
    } catch (error) {
        return dispatch({
            type: 'ERROR_ALERT',
            payload: ["error_name", "Bad request: The pokemon has not been found"],
        });
    }
};

export const setPokemon = (value) => async (dispatch) => {
    try {
        const response = await fetch(`${URL}pokemons/`, {
            method: "POST",
            body: JSON.stringify(value),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        if (!response.ok) {// handle error axios
            throw new Error(response.statusText);
        }
        const result = await response.json();
        return dispatch({
            type: "SET_POKEMON",
            payload: result
        })
    } catch (error) {
        return dispatch({
            type: 'ERROR_ALERT',
            payload: ["error_form", "Bad request: An unexpected error has occurred, please review the data before submitting it"],
        });
    }
}

export const updatePokemon = (value) => async (dispatch) => {
    try {
        const response = await fetch(`${URL}pokemons/`, {
            method: "PUT",
            body: JSON.stringify(value),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const result = await response.json();
        return dispatch({
            type: "UPDATE_POKEMON",
            payload: result
        })
    } catch (error) {
        return dispatch({
            type: 'ERROR_ALERT',
            payload: ["error_form", "Bad request: An unexpected error has occurred, please review the data before submitting it"],
        });
    }
}

export const resetDetail = () => {
    return {
        type: "RESET_DETAIL"
    }
}

export const resetAlerts = (value) => {
    return {
        type: "RESET_ALERT",
        payload: value
    }
}

export const resetFilters = () => {
    return {
        type: "RESET_FILTERS"
    }
}

export const enableAdd = (value) => {
    return {
        type: "ENABLE_ADD",
        payload: value
    }
}

export const teamGenerator = () => {
    return {
        type: "GENERATE_TEAM"
    }
}

export const addTeam = (value) => {
    return {
        type: "ADD_EQUIPO",
        payload: value
    }
}

export const deleteTeam = (value) => {
    return {
        type: "DELETE_EQUIPO",
        payload: value
    }
}

export const errorLengthTeam = () => {
    return {
        type: "ERROR_ALERT",
        payload: ["error_length", "The Pokemon team can have a maximum of 6 members."]
    }
}

export const setCurrentPage = (value) => {
    return {
        type: "SET_CURRENT_PAGE",
        payload: value
    }
}

export const deletePokemon = (id) => async (dispatch) => {
    const response = await fetch(`${URL}pokemons/${id}`, {
        method: "DELETE",
    });
    const result = await response.json();

    return dispatch({
        type: "DELETE_POKEMON",
        payload: result
    })
}