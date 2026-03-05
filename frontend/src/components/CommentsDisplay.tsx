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
} from "@mui/material";
import { useState } from "react";
import type { DialogComment } from "../types";

const CommentsDisplay = ({
  comments,
  postID,
  createComment,
}: {
  comments: DialogComment[];
  postID: number;
  createComment: (PostID: number, Comment: string) => void;
}) => {
  const [newComment, setNewComment] = useState("");

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
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
        {comments.map((comment) => (
          <ListItem key={comment.ID} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={comment.CommentUser.ProfileImage} />
            </ListItemAvatar>

            <ListItemText
              primary={comment.CommentUser.Username}
              secondary={comment.Comment}
              primaryTypographyProps={{ color: "white" }}
              secondaryTypographyProps={{ color: "#aaa" }}
            />
          </ListItem>
        ))}
      </List>

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
            createComment(postID, newComment);
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
