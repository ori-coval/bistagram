import type { Post } from "../types";
import "../css/posts.css";
import { ImageList, ImageListItem } from "@mui/material";

const PostGrid = ({ posts }: { posts: Post[] }) => {
  return (
    <ImageList sx={{ width: 700, height: 300 }} cols={3} >
      {posts.map((post) => (
        <ImageListItem key={post.ID}>
          <img
            src={post.images[0].image}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default PostGrid;
