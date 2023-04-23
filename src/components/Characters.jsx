import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react"
import { Search } from "./Search";

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
    const [search, setSearch] = useState('');
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
    const searchInput = useRef(null);

    useEffect(() => {
      fetch('https://rickandmortyapi.com/api/character/')
        .then(response => response.json())
        .then(data => setCharacters(data.results))

    }, [])

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
