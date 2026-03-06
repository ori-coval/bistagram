import type { ProfilePost } from "../types";
import LazyImage from "./LazyImage";

const PostGrid = ({
  posts,
  openPostDialog,
}: {
  posts: ProfilePost[];
  openPostDialog: (arg: number) => void;
}) => {
  return (
    <div
      style={{
        width: "80vw",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 4,
      }}
    >
      {posts.map((post) => (
        <div
          key={post.ID}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1/1",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={() => openPostDialog(post.ID)}
        >
          <LazyImage postID={post.ID} alt={post.Description ?? "post image"} />
        </div>
      ))}
    </div>
  );
};

export default PostGrid;
