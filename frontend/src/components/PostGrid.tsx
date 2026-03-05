import type { ProfilePost } from "../types";

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
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 4,
      }}
    >
      {posts.map((post) => (
        <div
          key={post.ID}
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "100%",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={() => openPostDialog(post.ID)}
        >
          <img
            src={post.RawImages[0]}
            loading="lazy"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default PostGrid;
