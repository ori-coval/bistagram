import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

export class Comment {
  profileImage: string;
  username: string;
  comment: string;

  constructor(profileImage: string, username: string, comment: string) {
    this.profileImage = profileImage;
    this.username = username;
    this.comment = comment;
  }
}

interface CommentsDisplayProps {
  comments: Comment[];
}

export default function CommentsDisplay({ comments }: CommentsDisplayProps) {
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
      {comments.map((item, index) => (
        <ListItem key={index} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar src={item.profileImage} />
          </ListItemAvatar>

          <ListItemText
            primary={item.username}
            secondary={item.comment}
            sx={{ color: "white" }}
          />
        </ListItem>
      ))}
    </List>
  );
}