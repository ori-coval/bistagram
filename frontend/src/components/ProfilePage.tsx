import { useCookies } from "react-cookie";
import PostGrid from "./PostGrid";
import { useEffect, useState } from "react";
import type { DialogPost, ProfileData } from "../types";
import axios from "axios";
import { Stack } from "@mui/material";
import ProfileInfo from "./ProfileInfo";
import PostDialog from "./PostDialog";
import EditBioDialog from "./EditBioDialog";

const ProfilePage = ({ username }: { username: string }) => {
  const [cookies] = useCookies(["access"]);
  const [profileData, setProfileData] = useState<ProfileData>();
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [editBioDialogOpen, setEditBioDialogOpen] = useState(false);
  const [dialogPost, setDialogPost] = useState<DialogPost>();

  useEffect(() => {
    axios
      .get(
        `http://85.65.146.6:9512/${username === "" ? "self" : `user/${username}`}/profile`,
        {
          headers: {
            Authorization: `Bearer ${cookies.access.token}`,
          },
        },
      )
      .then((response) => {
        setProfileData(response.data);
      });
  }, []);

  const openPostDialog = (postID: number) => {
    axios
      .get(`http://85.65.146.6:9512/post/${postID}`, {
        headers: {
          Authorization: `Bearer ${cookies.access.token}`,
        },
      })
      .then((response) => {
        setDialogPost(response.data);
        setPostDialogOpen(true);
      });
  };

  const openEditBioDialog = () => {
    setEditBioDialogOpen(true);
  };

  const closeEditBioDialog = () => {
    setEditBioDialogOpen(false);
  };

  const updateBio = (newBio: string) => {
    axios.post(
      "http://85.65.146.6:9512/user/edit-profile-bio",
      { Bio: newBio },
      {
        headers: {
          Authorization: `Bearer ${cookies.access.token}`,
        },
      },
    );
    setProfileData((oldProfileData) => {
      if (!oldProfileData) return oldProfileData;

      return {
        ...oldProfileData,
        User: {
          ...oldProfileData.User,
          Bio: newBio,
        },
      };
    });
  };

  const clickFollow = () => {
    axios.post(
      profileData?.AlreadyFollowing
        ? "http://85.65.146.6:9512/unfollow"
        : "http://85.65.146.6:9512/follow",
      { Username: username },
      {
        headers: {
          Authorization: `Bearer ${cookies.access.token}`,
        },
      },
    );

    setProfileData((oldProfileData) => {
      if (!oldProfileData) return oldProfileData;

      return {
        ...oldProfileData,
        AlreadyFollowing: !oldProfileData.AlreadyFollowing,
        FollowersCount: oldProfileData.AlreadyFollowing
          ? oldProfileData.FollowersCount - 1
          : oldProfileData.FollowersCount + 1,
      };
    });
  };

  const f = () => {};

  return (
    <div>
      <Stack direction="row" justifyContent="center">
        <Stack direction="column">
          <ProfileInfo
            profileData={
              profileData
                ? profileData
                : {
                    User: { Username: "", Bio: "", ProfileImage: "" },
                    Posts: [],
                    AlreadyFollowing: false,
                    FollowersCount: 0,
                    FollowingCount: 0,
                  }
            }
            isOwnProfile={username === ""}
            onEditBio={openEditBioDialog}
            onEditAvatar={f}
            onShowFollowers={f}
            onShowFollowing={f}
            onClickFollow={clickFollow}
          />
          <PostGrid
            posts={profileData ? profileData.Posts : []}
            openPostDialog={openPostDialog}
          />
        </Stack>
      </Stack>
      <PostDialog
        dialogPost={
          dialogPost
            ? dialogPost
            : {
                ID: 0,
                Description: "",
                Date: "",
                LikesCount: 0,
                CommentsCount: 0,
                AlreadyLiked: false,
                RawImages: [],
                User: { Username: "", ProfileImage: "" },
                Comments: [],
              }
        }
        open={postDialogOpen}
        onClose={() => {
          setPostDialogOpen(false);
        }}
      />
      <EditBioDialog
        open={editBioDialogOpen}
        onClose={closeEditBioDialog}
        currentBio={profileData ? profileData.User.Bio : ""}
        updateBio={updateBio}
      />
    </div>
  );
};

export default ProfilePage;
