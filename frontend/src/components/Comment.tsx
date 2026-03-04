import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import type { DialogPost } from "../types";

const CommentsDisplay = ({dialogPost}: { dialogPost : DialogPost}) =>{
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
      {dialogPost.Comments.map((item, index) => (
        <ListItem key={index} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar src={item.User.ProfileImage} />
          </ListItemAvatar>

          <ListItemText
            primary={item.User.Username}
            secondary={item.Comment}
            sx={{ color: "white" }}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default CommentsDisplay;