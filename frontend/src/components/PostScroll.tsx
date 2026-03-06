import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import type { ScrollPost } from "../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ShareIcon from "@mui/icons-material/Share";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useNavigate } from "react-router-dom";
import { getPostTime } from "../utility";
import { useState } from "react";
import copy from "copy-to-clipboard";

import { FRONTEND_URL } from "../constants";
const PostScroll = ({
  posts,
  changeLikeStatus,
  openPostDialog,
}: {
  posts: ScrollPost[];
  changeLikeStatus: (arg1: number, arg2: boolean) => void;
  openPostDialog: (arg: number) => void;
}) => {
  const navigate = useNavigate();
  const [copiedPostID, setCopiedPostID] = useState(-1);

  const copyShareLink = (postID: number) => {
    copy(`${FRONTEND_URL}/post/${postID}`);
    setCopiedPostID(postID);
    setTimeout(() => {
      setCopiedPostID(-1);
    }, 750);
  }

  return (
    <Stack spacing={1}>
      {posts.map((post) => (
        <Card
          key={post.ID}
          sx={{ width: "100%", maxWidth: 500, boxShadow: "none" }}
        >
          <CardHeader
            avatar={
              <Avatar
                src={post.User.ProfileImage}
                onClick={() => navigate(`/profile-page/${post.User.Username}`)}
                sx={{ cursor: "pointer" }}
              />
            }
            subheader={
              <>
                <Typography>
                  <span
                    onClick={() =>
                      navigate(`/profile-page/${post.User.Username}`)
                    }
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      cursor: "pointer",
                    }}
                  >
                    {post.User.Username}
                  </span>{" "}
                  • {getPostTime(post.Date)}
                </Typography>
              </>
            }
          />
          <CardMedia
            onClick={() => openPostDialog(post.ID)}
            sx={{ cursor: "pointer" }}
            component="img"
            image={post.RawImages[0]}
            loading="lazy"
          />
          <CardContent>
            <Typography sx={{ wordWrap: "break-word" }}>
              {post.Description}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ marginTop: 1 }}>
              <div
                onClick={() => {
                  changeLikeStatus(post.ID, post.AlreadyLiked);
                }}
                style={{ cursor: "pointer" }}
              >
                {post.AlreadyLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </div>
              <Typography sx={{ marginRight: 1 }}>{post.LikesCount}</Typography>
              <div
                onClick={() => {
                  openPostDialog(post.ID);
                }}
                style={{ cursor: "pointer" }}
              >
                <CommentOutlinedIcon />
              </div>
              <Typography>{post.CommentsCount}</Typography>
              <div
                onClick={() => {copyShareLink(post.ID)}}
                style={{ cursor: "pointer" }}
              >
                {post.ID === copiedPostID ? <DoneAllIcon /> : <ShareIcon />}
              </div>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default PostScroll;
