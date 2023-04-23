
export const Search = ({search, searchInput, onSearch}) => {
    return (
        <div className="search">
            <input type="text" value={search} ref={searchInput} onChange={onSearch} />
        </div>
    )
}
