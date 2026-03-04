import type { Post } from "../types";
import { ImageList, ImageListItem } from "@mui/material";

const PostGrid = ({ posts }: { posts: Post[] }) => {
  return (
    <ImageList cols={3} rowHeight={400}>
      {posts.map((post) => (
        <ImageListItem key={post.ID}>
          <img
            src={post.images[0].image}
            style={{ width: 300, objectFit: "cover" }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default PostGrid;
