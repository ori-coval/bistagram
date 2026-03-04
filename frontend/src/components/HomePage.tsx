import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import type { UserData } from "../types";
import axios from "axios";
import PostScroll from "./PostScroll";

const HomePage = () => {
  const [cookies,] = useCookies(["access"]);
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    axios
      .get(`http://85.65.146.6:9512/user/profile`,
        { headers: {
          Authorization: `Bearer ${cookies.access.token}`
        }}
      )
      .then((response) => {
        setUserData(response.data);
      });
  }, []);
  
  return (
    <div>
      <PostScroll posts={userData ? userData.posts : []} />
    </div>
  );
};

export default HomePage;
