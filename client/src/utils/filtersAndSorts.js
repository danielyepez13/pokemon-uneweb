
export function filterByType(myPokemons, typeCurrent) {
    return myPokemons.filter(pokemon => {
        return pokemon.types.find(type => type.name === typeCurrent)
    });
}

export function filterByOrigin(myPokemons, origin) {
    if (origin === "API") {
        return myPokemons.filter(pokemon => {
            return !isNaN(Number(pokemon.id))
        });
    } else {
        return myPokemons.filter(pokemon => {
            return isNaN(Number(pokemon.id))
        });
    }
}

export function sortAttack(filterResults, order, orderAlph) {
    if (order === "ASC") {
        if (orderAlph) {
            filterResults.sort((a, b) => {
                if (a.name === b.name) {
                    return a.stat.attack - b.stat.attack;
                }
                return 0;
            });
        } else {
            filterResults.sort((a, b) => a.stat.attack - b.stat.attack);
        }
    } else if (order === "DESC") {
        if (orderAlph) {
            filterResults.sort((a, b) => {
                if (a.name === b.name) {
                    return b.stat.attack - a.stat.attack;
                }
                return 0;
            });
        } else {
            filterResults.sort((a, b) => b.stat.attack - a.stat.attack);
        }
    }
    return filterResults;
}

export function sortAlphabetically(filterResults, order, orderAtk) {
    if (order === "A-Z") {
        if (orderAtk) {
            filterResults.sort((a, b) => {
                if (a.stat.attack === b.stat.attack) {
                    return a.name.localeCompare(b.name);
                }
                return 0;
            });
        } else {
            filterResults.sort((a, b) => a.name.localeCompare(b.name));
        }
    } else if (order === "Z-A") {
        if (orderAtk) {
            filterResults.sort((a, b) => {
                if (a.stat.attack === b.stat.attack) {
                    return b.name.localeCompare(a.name);
                }
                return 0;
            });
        } else {
            filterResults.sort((a, b) => b.name.localeCompare(a.name));
        }
    }
    return filterResults;
}

export function allFiltersAndSortings(allPokemons, type, origin, orderAlph, orderAtk, firstOrder, secondOrder, addPokemon){
    let endResultFiltered = [...allPokemons];
    if (type || origin || orderAlph || orderAtk) {
        if (type) {
            endResultFiltered = endResultFiltered.filter(pokemon => {
                return pokemon.types.find(type => type.name === addPokemon.types[0].name)
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
                    endResultFiltered.sort((a, b) => a.stat.attack - b.stat.attack);
                } else if (orderAtk === "DESC") {
                    endResultFiltered.sort((a, b) => b.stat.attack - a.stat.attack);
                }
            } else if (firstOrder === "ALF") {
                if (orderAlph === "A-Z") {
                    endResultFiltered.sort((a, b) => a.name.localeCompare(b.name));
                } else if (orderAlph === "Z-A") {
                    endResultFiltered.sort((a, b) => b.name.localeCompare(a.name));
                }
            }

            if (secondOrder === "ATQ") {
                endResultFiltered.sort((a, b) => {
                    if (a.name === b.name) {
                        return (orderAtk === "ASC") ? a.stat.attack - b.stat.attack : b.stat.attack - a.stat.attack;
                    }
                    return 0;
                });
            } else if (secondOrder === "ALF") {
                endResultFiltered.sort((a, b) => {
                    if (a.stat.attack === b.stat.attack) {
                        return (orderAlph === "A-Z") ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
                    }
                    return 0;
                });
            }
        }
    }
    return endResultFiltered;
}