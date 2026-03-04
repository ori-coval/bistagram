import { useCookies } from "react-cookie";
import PostGrid from "./PostGrid";
import { useEffect, useState } from "react";
import type { DialogPost, ProfileData } from "../types";
import axios from "axios";
import { Stack } from "@mui/material";
import ProfileInfo from "./ProfileInfo";
import PostDialog from "./PostDialog";

const ProfilePage = () => {
  const [cookies,] = useCookies(["access"]);
  const [profileData, setProfileData] = useState<ProfileData>();
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [dialogPost, setDialogPost] = useState<DialogPost>();

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

  const openPostDialog = (postID: number) => {
    axios
      .get(`http://85.65.146.6:9512/post/${postID}`,
        { headers: {
          Authorization: `Bearer ${cookies.access.token}`
        }}
      )
      .then((response) => {
        setDialogPost(response.data);
        setPostDialogOpen(true);
      });
  };
  
  const f = () => {};

  return (
    <div>
      <Stack direction="row" justifyContent="center">
        <Stack direction="column">
          <ProfileInfo user={profileData ? profileData.User : {Username: "", ProfileImage: "", Bio: ""}} isOwnProfile onEditBio={f} onEditAvatar={f} onShowFollowers={f} onShowFollowing={f}/>
          <PostGrid posts={profileData ? profileData.Posts : []} openPostDialog={openPostDialog} />
        </Stack>
      </Stack>
      <PostDialog dialogPost={dialogPost ? dialogPost : { ID: 0, Description: "", Date: "", LikesCount: 0, CommentsCount: 0, AlreadyLiked: false, RawImages: [], User: {Username: "", ProfileImage: ""}, Comments: []}} open={postDialogOpen} onClose={() => {setPostDialogOpen(false)}}/>
    </div>
  );
};

export default ProfilePage;
