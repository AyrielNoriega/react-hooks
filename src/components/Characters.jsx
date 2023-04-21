import { useEffect, useReducer, useState } from "react"

const initialState = {
    favorites: []
}

const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
    
        default:
            return state;
    }
}

export const Characters = () => {

    const [characters, setCharacters] = useState([])

    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

    useEffect(() => {
      fetch('https://rickandmortyapi.com/api/character/')
        .then(response => response.json())
        .then(data => setCharacters(data.results))

    }, [])

    const onHandleClic = (favorite) => {
        console.log(favorite);
        dispatch({type: 'ADD_TO_FAVORITE', payload: favorite});
    }
    
    return (
        <div className="characters">
            
            {favorites.favorites.map(favorite => (
                <li key={favorite.id}>
                    {favorite.name}
                </li>
            ))}

            {characters.map(character => (
                <div className="className" key={character.id}>
                    <h2>{character.name}</h2>
                    <button type="button" onClick={() => onHandleClic(character)}>
                        Agregar a Favoritos
                    </button>
                </div>
            ))}
        </div>
    )
}
