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

const CommentsDisplay = ({ comments }: { comments: DialogComment[] }) => {
  const [newComment, setNewComment] = useState("");

  const sendComment = () => {
    if (!newComment.trim()) return;

    
  };
  for (var i = 0; i < 10; i++) {
    comments.push(comments[0]);
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#212328",
      }}
    >
      <List
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 2,
          py: 1,
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
          onClick={sendComment}
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
