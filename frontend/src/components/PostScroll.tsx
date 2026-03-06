import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import type { ScrollPost } from "../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ShareIcon from "@mui/icons-material/Share";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useNavigate } from "react-router-dom";
import { getPostTime } from "../utility";
import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { useCookies } from "react-cookie";
import LazyImage from "./LazyImage";
import { FRONTEND_URL } from "../constants";
import PostDescription from "./PostDescription";

const PostScroll = ({
  posts,
  usernames,
  changeLikeStatus,
  openPostDialog,
}: {
  posts: ScrollPost[];
  usernames: string[];
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
  };

  return (
    <Stack spacing={1}>
      {posts.map((post) => (
        <Card
          key={post.ID}
          sx={{boxShadow: "none" }}
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

          <div
            onClick={() => openPostDialog(post.ID)}
            style={{ cursor: "pointer" }}
          >
            <LazyImage
              postID={post.ID}
              alt={post.Description ?? "post image"}
            />
          </div>

          <CardContent>
            <PostDescription description={post.Description} usernames={usernames}/>
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
                onClick={() => {
                  copyShareLink(post.ID);
                }}
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
