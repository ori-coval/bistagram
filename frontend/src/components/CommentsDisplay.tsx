import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import type { DialogComment } from "../types";

const CommentsDisplay = ({comments}: { comments : DialogComment[]}) =>{
  return (
    <List
      sx={{
        width: "30%",
        maxWidth: "50%",
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: "99%",
        backgroundColor: "#212328",
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
            sx={{ color: "white" }}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default CommentsDisplay;