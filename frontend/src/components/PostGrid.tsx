import type { ProfilePost } from "../types";
import { ImageList, ImageListItem } from "@mui/material";

const PostGrid = ({ posts, openPostDialog }: { posts: ProfilePost[], openPostDialog: (arg: number) => void }) => {
  return (
    <ImageList cols={5} rowHeight={350} sx={{ overflow: "hidden" }} >
      {posts.reverse().map((post) => (
        <ImageListItem key={post.ID} sx={{ width: 290, objectFit: "cover" }}>
          <img
            src={post.RawImages[0]}
            onClick={() => { openPostDialog(post.ID) }}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default PostGrid;
