import type { ProfilePost } from "../types";
import { ImageList, ImageListItem } from "@mui/material";

const PostGrid = ({ posts }: { posts: ProfilePost[] }) => {
  return (
    <ImageList cols={3} rowHeight={400}>
      {posts.map((post) => (
        <ImageListItem key={post.ID}>
          <img
            src={post.Images[0]}
            style={{ width: 300, objectFit: "cover" }}
          />
          <p>{post.Images[0]}</p>
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default PostGrid;
