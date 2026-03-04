import { Avatar, Card, CardContent, CardHeader, CardMedia, Stack, Typography } from "@mui/material";
import type { ScrollPost } from "../types";

const PostScroll = ({ posts }: { posts: ScrollPost[] }) => {
  
  const getPostTime = (post: ScrollPost): string => {
    const seconds = Math.floor((Date.now() - new Date(post.Date).getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours}h`;
    }
    const days = Math.floor(minutes / 24);
    return `${days}d`;
  }

  return (
    <Stack>
      {posts.map((post) => (
        <Card key={post.ID} sx={{ width: 500 }}>
          <CardHeader
            avatar={
              <Avatar>TMP</Avatar>
            }
            subheader={
              <Typography sx={{ fontWeight: "bold" }}>
                username • {getPostTime(post)}
              </Typography>
            }
          />
          <CardMedia
            component="img"
            image={post.Images[0]}
          />
          <CardContent>
            <Typography>
              {post.Description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default PostScroll;
