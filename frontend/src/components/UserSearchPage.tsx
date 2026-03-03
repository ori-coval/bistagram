import { useCookies } from "react-cookie";
import type { User } from "../types";
import UserSearch from "./UserSearch";
import { useState } from "react";
import axios from "axios";
import UserScroll from "./UserScroll";

const UserSearchPage = () => {
  const [cookies,] = useCookies(["access"]);
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const submitSearch = () => {
    axios
      .get("http://85.65.146.6:9512/users/search",
        { params: {
          search_text: searchValue
        }, headers: {
          Authorization: `Bearer ${cookies.access.token}`
        }}
      )
      .then((response) => {
        setUsers(response.data);
      })
  };

  return (
    <div>
      <UserSearch searchValue={searchValue} setSearchValue={setSearchValue} submitSearch={submitSearch} />
      <UserScroll users={users}/>
    </div>
  );
};

export default UserSearchPage;
