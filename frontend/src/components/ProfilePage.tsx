import { useCookies } from "react-cookie";
import PostGrid from "./PostGrid";
import { useEffect, useState } from "react";
import type { UserData } from "../types";
import axios from "axios";
import { Box, Stack } from "@mui/material";

const ProfilePage = () => {
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
    <Stack minHeight="100vh" direction="row" justifyContent="center">
      <Stack direction="column">
        <PostGrid posts={userData ? userData.posts : []} />
      </Stack>
    </Stack>
  );
};

export default ProfilePage;
