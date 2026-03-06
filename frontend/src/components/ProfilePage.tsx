import { useCookies } from "react-cookie";
import PostGrid from "./PostGrid";
import { useEffect, useRef, useState } from "react";
import type { DialogPost, ProfileData } from "../types";
import axios from "axios";
import { Stack } from "@mui/material";
import ProfileInfo from "./ProfileInfo";
import PostDialog from "./PostDialog";
import LoadingPage from "./LoadingPage";
import EditProfilePictureDialog from "./EditProfilePictureDialog";
import FollowDialog from "./FollowDialog";
import { BACKEND_URL } from "../constants";

const ProfilePage = ({ username }: { username: string }) => {
  const [cookies] = useCookies(["access"]);
  const [loading, setLoading] = useState(0);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [profileData, setProfileData] = useState<ProfileData>();
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [dialogPost, setDialogPost] = useState<DialogPost>();
  const [editingBio, setEditingBio] = useState(false);
  const [editBioDialogOpen, setEditBioDialogOpen] = useState(false);
  const [followDialogOpen, setFollowDialogOpen] = useState(false);
  const [followDialogSearchGroup, setFollowDialogSearchGroup] = useState<
    "followers" | "following"
  >("followers");

  const createComment = async (postID: number, newComment: string) => {
    if (!newComment.trim()) return;
    const newComments = await axios.post(
      BACKEND_URL + "/create-comment",
      {
        PostID: postID,
        Comment: newComment,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies.access.token}`,
        },
      },
    );
    if (!dialogPost) return;
    setDialogPost(newComments.data);
  };

  useEffect(() => {
    axios
      .get(
        `${BACKEND_URL}/${username === "" ? "self" : `user/${username}`}/profile`,
        {
          headers: {
            Authorization: `Bearer ${cookies.access.token}`,
          },
        },
      )
      .then((response) => {
        setProfileData(response.data);
        setLoading((prev) => prev + 1);
      });
    axios
      .get(`${BACKEND_URL}/users/usernames`, {
        headers: {
          Authorization: `Bearer ${cookies.access.token}`,
        },
      })
      .then((response) => {
        setUsernames(response.data);
        setLoading((prev) => prev + 1);
      });
  }, []);

  const openPostDialog = (postID: number) => {
    axios
      .get(`${BACKEND_URL}/post/${postID}`, {
        headers: {
          Authorization: `Bearer ${cookies.access.token}`,
        },
      })
      .then((response) => {
        setDialogPost(response.data);
        setPostDialogOpen(true);
      });
  };

  const updateBio = (newBio: string) => {
    axios.post(
      BACKEND_URL + "/user/edit-profile-bio",
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
    setEditingBio(false);
  };

  const imageRef = useRef<HTMLInputElement>(null);

  const openEditAvatarDialog = () => {
    imageRef.current ? imageRef.current.click() : {};
  };

  const updateProfileImage = (newProfileImage: string) => {
    axios.post(
      BACKEND_URL + "/user/edit-profile-picture",
      { image: newProfileImage },
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
          ProfileImage: newProfileImage,
        },
      };
    });
  };

  const clickFollow = () => {
    axios.post(
      profileData?.AlreadyFollowing
        ? BACKEND_URL + "/unfollow"
        : BACKEND_URL + "$/follow",
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

  const openFollowersDialog = () => {
    setFollowDialogSearchGroup("followers");
    setFollowDialogOpen(true);
  };

  const openFollowingDialog = () => {
    setFollowDialogSearchGroup("following");
    setFollowDialogOpen(true);
  };
  const changeLikeStatus = (postID: number, alreadyLiked: boolean) => {
    setDialogPost((oldPost) => {
      if (!oldPost) return oldPost;
      let newPosts = { ...oldPost };
      if (oldPost?.ID === postID && oldPost.AlreadyLiked === alreadyLiked) {
        axios.post(
          `${BACKEND_URL}/post/${postID}/${alreadyLiked ? "unlike" : "like"}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${cookies.access.token}`,
            },
          },
        );
        newPosts.AlreadyLiked = !alreadyLiked;
        if (!newPosts.LikesCount) newPosts.LikesCount = 0;
        newPosts.LikesCount += alreadyLiked ? -1 : 1;
        return newPosts;
      }

      return oldPost;
    });
  };

  return (loading >= 2) ? (
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
            editingBio={editingBio}
            setEditingBio={setEditingBio}
            updateBio={updateBio}
            onEditAvatar={openEditAvatarDialog}
            onShowFollowers={openFollowersDialog}
            onShowFollowing={openFollowingDialog}
            onClickFollow={clickFollow}
          />
          <p style={{ marginTop: 10 }} />
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
        usernames={usernames}
        changeLikeStatus={changeLikeStatus}
        open={postDialogOpen}
        onClose={() => {
          setPostDialogOpen(false);
        }}
        createComment={createComment}
      />
      <EditProfilePictureDialog
        updateProfileImage={updateProfileImage}
        imageRef={imageRef}
      />
      <FollowDialog
        open={followDialogOpen}
        onClose={() => {
          setFollowDialogOpen(false);
        }}
        searchGroup={followDialogSearchGroup}
        username={
          username === ""
            ? profileData
              ? profileData.User.Username
              : ""
            : username
        }
      />
    </div>
  ) : (
    <LoadingPage />
  );
};

export default ProfilePage;
