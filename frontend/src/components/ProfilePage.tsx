import { useCookies } from "react-cookie";
import PostGrid from "./PostGrid";
import { useEffect, useState } from "react";
import type { UserData } from "../types";
import axios from "axios";
import { Box } from "@mui/material";

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
    <Box sx={{ display: "flex", minHeight: "100vh", justifyContent: "center", border: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "column", wdith: 1500, border: 1 }}>
        <PostGrid posts={userData ? userData.posts : []} />
      </Box>
    </Box>
  );
};

export default ProfilePage;
