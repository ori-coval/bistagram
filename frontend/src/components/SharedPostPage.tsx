import { useCookies } from "react-cookie";
import PostDialog from "./PostDialog";
import axios from "axios";
import { useEffect, useState } from "react";
import type { DialogPost } from "../types";
import { useNavigate } from "react-router-dom";

const SharedPostPage = ({ postID }: { postID: number }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["access"]);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [dialogPost, setDialogPost] = useState<DialogPost>();

  useEffect(() => {
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
  }, []);

  const onClose = () => {
    setPostDialogOpen(false);
    navigate("/home-page");
  };

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

  const changeLikeStatus = (postID: number, alreadyLiked: boolean) => {
    setDialogPost((oldPost) => {
      if (!oldPost) return oldPost;
      let newPosts = { ...oldPost };
      if (oldPost?.ID === postID && oldPost.AlreadyLiked === alreadyLiked) {
        axios.post(
          `http://85.65.146.6:9512/post/${postID}/${alreadyLiked ? "unlike" : "like"}`,
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

  return (
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
      onClose={onClose}
      createComment={createComment}
    />
  );
};

export default SharedPostPage;
