import { useCallback, useMemo, useReducer, useRef, useState } from "react"
import { Search } from "./Search";
import { useCharacters } from "../hooks/useCharacters";


const API = 'https://rickandmortyapi.com/api/character/';

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

    const [search, setSearch] = useState('');
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
    const searchInput = useRef(null);

    const onHandleClic = (favorite) => {
        console.log(favorite);
        dispatch({type: 'ADD_TO_FAVORITE', payload: favorite});
    }

    // const onSearch = () => {
    //     console.log(searchInput.current.value);
    //     setSearch(searchInput.current.value);
    // }


    const onSearch = useCallback(
      () => {
        setSearch(searchInput.current.value);
      },
      [],
    )
    
    const characters = useCharacters(API);

    // const filteredUsers = characters.filter((user) => {
    //     console.log('inicia');
    //     return user.name.toLowerCase().includes(search.toLowerCase())
    // })

    const filteredUsers = useMemo(() => 
        characters.filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase())
        }), [characters, search])
    
    return (
        <div className="characters">
            
            {favorites.favorites.map(favorite => (
                <li key={favorite.id}>
                    {favorite.name}
                </li>
            ))}

            <Search search={search} searchInput={searchInput} onSearch={onSearch}/>

            {filteredUsers.map(character => (
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
