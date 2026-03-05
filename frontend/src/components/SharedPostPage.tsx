import { useCookies } from "react-cookie";
import PostDialog from "./PostDialog"
import axios from "axios";
import { useEffect, useState } from "react";
import type { DialogPost } from "../types";
import { useNavigate } from "react-router-dom";


const SharedPostPage = ({ postID }: { postID: number }) => {
    const navigate = useNavigate();
    const [cookies,] = useCookies(["access"]);
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
    }

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
            onClose={onClose}
            createComment={createComment}
        />
    )
}

export default SharedPostPage;
