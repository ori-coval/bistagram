import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  TextField,
  Divider,
  Button,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import { useState } from "react";
import type { DialogPost } from "../types";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { getPostTime } from "../utility";
import copy from "copy-to-clipboard";

const CommentsDisplay = ({
  dialogPost,
  createComment,
  changeLikeStatus,
}: {
  dialogPost: DialogPost;
  createComment: (PostID: number, Comment: string) => void;
  changeLikeStatus: (arg1: number, arg2: boolean) => void;
}) => {
  const [newComment, setNewComment] = useState("");
  const [copiedPost, setCopiedPost] = useState(false);

  const copyShareLink = () => {
    copy(`http://85.65.146.6:12345/post/${dialogPost.ID}`);
    setCopiedPost(true);
    setTimeout(() => {
      setCopiedPost(false);
    }, 750);
    }

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#212328",
        overflow: "hidden",
      }}
    >
      <List
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 2,
          py: 1,
          minHeight: 0,
        }}
      >
        {dialogPost.Comments.map((comment) => (
          <ListItem key={comment.ID} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={comment.CommentUser.ProfileImage} />
            </ListItemAvatar>

            <ListItemText
              primary={`${comment.CommentUser.Username} • ${getPostTime(comment.Date)}`}
              secondary={comment.Comment}
              primaryTypographyProps={{ color: "white" }}
              secondaryTypographyProps={{ color: "#aaa" }}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ backgroundColor: "#333" }} />
      <CardContent>
        <Typography sx={{ wordWrap: "break-word", fontSize: 20 }}>
          {dialogPost.Description}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ marginTop: 1 }}>
          <div
            onClick={() => {
              changeLikeStatus(dialogPost.ID, dialogPost.AlreadyLiked);
            }}
            style={{ cursor: "pointer" }}
          >
            {dialogPost.AlreadyLiked ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </div>
          <Typography sx={{ marginRight: 1 }}>
            {dialogPost.LikesCount}
          </Typography>
          <CommentOutlinedIcon />
          <Typography>{dialogPost.CommentsCount}</Typography>
          <div
            onClick={copyShareLink}
            style={{ cursor: "pointer" }}
          >
            {copiedPost ? <DoneAllIcon /> : <ShareIcon />}
          </div>
        </Stack>
      </CardContent>
      <Divider sx={{ backgroundColor: "#333" }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 1,
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          variant="standard"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          InputProps={{
            disableUnderline: true,
            sx: {
              color: "white",
            },
          }}
        />

        <Button
          onClick={() => {
            createComment(dialogPost.ID, newComment);
            setNewComment("");
          }}
          disabled={!newComment.trim()}
          sx={{
            color: "#0095f6",
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
};

export default CommentsDisplay;
