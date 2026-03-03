import { useState } from "react";


const UserSearch = () => {
    const [searchValue, setSearchValue] = useState("");

    const submitSearch = () => {

    };

    return (
        <div>
            <label htmlFor="search"></label>
            <input type="search" id="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            <button onClick={submitSearch}>Search</button>
        </div>
    );
};

export default UserSearch;
