import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import type { DialogPost, ScrollPost } from "../types";
import axios from "axios";
import PostScroll from "./PostScroll";
import { Stack } from "@mui/material";
import PostDialog from "./PostDialog";
import LoadingPage from "./LoadingPage";
import { BACKEND_URL } from "../constants";

const HomePage = () => {
  const [cookies,] = useCookies(["access"]);
  const [loadingPage, setLoadingPage] = useState(0);
  const [loadingDialog, setLoadingDialog] = useState(false);
  const [posts, setPosts] = useState<ScrollPost[]>([]);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [dialogPost, setDialogPost] = useState<DialogPost>();

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
      .get(`${BACKEND_URL}/self/home/posts`, {
        headers: {
          Authorization: `Bearer ${cookies.access.token}`,
        },
      })
      .then((response) => {
        setPosts(response.data);
        setLoadingPage((prev) => prev + 1);
      });
    axios
      .get(`${BACKEND_URL}/users/usernames`, {
        headers: {
          Authorization: `Bearer ${cookies.access.token}`,
        },
      })
      .then((response) => {
        setUsernames(response.data);
        setLoadingPage((prev) => prev + 1);
      });
  }, []);

  useEffect(() => {
    if (loadingDialog) {
      let style = document.createElement("style");
      style.id = "cursor-wait";
      style.textContent = `* { cursor: wait !important; }`;
      document.head.appendChild(style);
    } else {
      document.getElementById("cursor-wait")?.remove();
    }
  }, [loadingDialog]);

  const openPostDialog = (postID: number) => {
    setLoadingDialog(true);
    axios
      .get(`${BACKEND_URL}/post/${postID}`, {
        headers: {
          Authorization: `Bearer ${cookies.access.token}`,
        },
      })
      .then((response) => {
        setDialogPost(response.data);
        setPostDialogOpen(true);
        setLoadingDialog(false);
      });
  };

  const changeLikeStatus = (postID: number, alreadyLiked: boolean) => {
    setPosts((oldPosts) => {
      let newPosts = oldPosts.slice();
      for (let i = 0; i < oldPosts.length; i++) {
        if (
          oldPosts[i].ID === postID &&
          oldPosts[i].AlreadyLiked === alreadyLiked
        ) {
          axios.post(
            `${BACKEND_URL}/post/${postID}/${alreadyLiked ? "unlike" : "like"}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${cookies.access.token}`,
              },
            },
          );
          newPosts[i].AlreadyLiked = !alreadyLiked;
          newPosts[i].LikesCount += alreadyLiked ? -1 : 1;
          return newPosts;
        }
      }
      return oldPosts;
    });

    setDialogPost((oldPost) => {
      if (!oldPost) return oldPost;
      let newPosts = { ...oldPost };
      if (oldPost?.ID === postID && oldPost.AlreadyLiked === alreadyLiked) {
        newPosts.AlreadyLiked = !alreadyLiked;
        newPosts.LikesCount += alreadyLiked ? -1 : 1;
        return newPosts;
      }

      return oldPost;
    })
  };

  return (loadingPage >= 2) ? (
    <div>
      <Stack
        minHeight="100vh"
        direction="row"
        justifyContent="center"
        sx={{ px: 1 }}
      >
        <Stack direction="column" sx={{width: "100%", maxWidth: 500}}>
          <PostScroll
            posts={posts}
            usernames={usernames}
            openPostDialog={openPostDialog}
            changeLikeStatus={changeLikeStatus}
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
    </div>
  ) : (
    <LoadingPage />
  );
};

export default HomePage;
