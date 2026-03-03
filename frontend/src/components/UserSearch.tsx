const UserSearch = ({
    searchValue,
    setSearchValue,
    submitSearch
}: {
    searchValue: string,
    setSearchValue: (arg: string) => void,
    submitSearch: () => void
}) => {
    return (
        <div>
            <label htmlFor="search"></label>
            <input type="search" id="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            <button onClick={submitSearch}>Search</button>
        </div>
    );
};

export default UserSearch;
