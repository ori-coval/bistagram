import { Avatar, Card, CardContent, CardHeader, CardMedia, Stack, Typography } from "@mui/material";
import type { ScrollPost } from "../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { useNavigate } from "react-router-dom";

const PostScroll = ({ posts, changeLikeStatus, openPostDialog }: { posts: ScrollPost[], changeLikeStatus: (arg1: number, arg2: boolean) => void, openPostDialog: (arg: number) => void }) => {
  const navigate = useNavigate();

  const getPostTime = (post: ScrollPost): string => {
    const seconds = Math.floor((Date.now() - new Date(post.Date).getTime() - 2 * 60 * 60 * 1000) / 1000);
    new Date().toLocaleString()
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours}h`;
    }
    const days = Math.floor(hours / 24);
    return `${days}d`;
  }

  return (
    <Stack spacing={1}>
      {posts.map((post) => (
        <Card key={post.ID} sx={{ width: 500, boxShadow: "none" }}>
          <CardHeader
            avatar={
              <Avatar src={post.User.ProfileImage} onClick={() => navigate(`/profile-page/${post.User.Username}`)} sx={{ cursor: "pointer" }} />
            }
            subheader={<>
              <Typography>
                <span onClick={() => navigate(`/profile-page/${post.User.Username}`)} style={{ fontWeight: "bold", color: "black", cursor: "pointer" }}>{post.User.Username}</span> • {getPostTime(post)}
              </Typography>
              </>
            }
          />
          <CardMedia onClick={() => openPostDialog(post.ID)} sx={{ cursor: "pointer" }}
            component="img"
            image={post.RawImages[0]}
            loading="lazy"
          />
          <CardContent>
            <Typography sx={{ wordWrap: "break-word" }}>
              {post.Description}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ paddingTop: 1 }}>
              <div onClick={() => { changeLikeStatus(post.ID, post.AlreadyLiked) }} style={{ cursor: "pointer" }}>
                {post.AlreadyLiked ? <FavoriteIcon/> : <FavoriteBorderIcon />}
              </div>
              <Typography sx={{ paddingRight: 1 }}>
                {post.LikesCount}
              </Typography>
              <div onClick={() => { openPostDialog(post.ID) }} style={{ cursor: "pointer" }}>
                <CommentOutlinedIcon />
              </div>
              <Typography>
                {post.CommentsCount}
              </Typography>
              
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default PostScroll;
