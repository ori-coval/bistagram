import { useCookies } from "react-cookie";
import PostGrid from "./PostGrid";
import { useEffect, useState } from "react";
import type { UserData } from "../types";
import axios from "axios";

const UserPage = ({ username }: { username: string }) => {
  const [cookies,] = useCookies(["access"])
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    axios
      .get(`http://85.65.146.6:9512/user/${username}/all`,
        { headers: {
          Authorization: `Bearer ${cookies.access.token}`
        }}
      )
      .then((response) => {
        setUserData(response.data);
      })
  }, []);
  
  return (
    <div>
      <PostGrid posts={userData ? userData.posts : []} />
    </div>
  );
};

export default UserPage;
