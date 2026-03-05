import { useCookies } from "react-cookie";
import PostDialog from "./PostDialog"
import axios from "axios";
import { useState } from "react";
import type { DialogPost } from "../types";


const SharedPostPage = (postID) => {
    const [cookies,] = useCookies(["access"]);
    const [postDialogOpen, setPostDialogOpen] = useState(false);
    const [dialogPost, setDialogPost] = useState<DialogPost>();

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

    return (
        <PostDialog
            dialogPost={dialogPost}
            open={postDialogOpen}
            onClose={() => {}}
            createComment={createComment}
        />
    )
}

export default SharedPostPage;
