import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import type { DialogPost, ScrollPost } from "../types";
import axios from "axios";
import PostScroll from "./PostScroll";
import { Stack } from "@mui/material";
import PostDialog from "./PostDialog";
import LoadingPage from "./LoadingPage";

const HomePage = () => {
  const [cookies,] = useCookies(["access"]);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<ScrollPost[]>([]);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [dialogPost, setDialogPost] = useState<DialogPost>();

  const createComment = async (postID: number, newComment: string) => {
    if (!newComment.trim()) return;
    const newComments = await axios.post(
      "http://85.65.146.6:9512/create-comment",
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
      .get(`http://85.65.146.6:9512/self/home/posts`, {
        headers: {
          Authorization: `Bearer ${cookies.access.token}`,
        },
      })
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
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

  const changeLikeStatus = (postID: number, alreadyLiked: boolean) => {
    setPosts((oldPosts) => {
      let newPosts = oldPosts.slice();
      for (let i = 0; i < oldPosts.length; i++) {
        if (
          oldPosts[i].ID === postID &&
          oldPosts[i].AlreadyLiked === alreadyLiked
        ) {
          axios.post(
            `http://85.65.146.6:9512/post/${postID}/${alreadyLiked ? "unlike" : "like"}`,
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

  return !loading ? (
    <div>
      <Stack
        minHeight="100vh"
        direction="row"
        justifyContent="center"
        sx={{ px: 1 }}
      >
        <Stack direction="column">
          <PostScroll
            posts={posts}
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
