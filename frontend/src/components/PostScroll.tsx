import type { Post } from "../types";

const PostScroll = ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.ID}>
            {post.Date}
            <br />
            <img src={post.images[0].image} />
            <br />
            {post.Description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostScroll;
