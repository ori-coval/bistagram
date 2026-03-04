import { useCookies } from "react-cookie";
import PostGrid from "./PostGrid";
import { useEffect, useState } from "react";
import type { ProfileData } from "../types";
import axios from "axios";
import { Stack } from "@mui/material";

const ProfilePage = () => {
  const [cookies,] = useCookies(["access"]);
  const [profileData, setProfileData] = useState<ProfileData>();

  useEffect(() => {
    axios
      .get(`http://85.65.146.6:9512/self/profile`,
        { headers: {
          Authorization: `Bearer ${cookies.access.token}`
        }}
      )
      .then((response) => {
        setProfileData(response.data);
      });
  }, []);
  
  return (
    <Stack minHeight="100vh" direction="row" justifyContent="center">
      <Stack direction="column">
        <PostGrid posts={profileData ? profileData.Posts : []} />
      </Stack>
    </Stack>
  );
};

export default ProfilePage;
