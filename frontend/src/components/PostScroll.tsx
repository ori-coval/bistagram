import { useState, useEffect } from "react";
import axios from "axios";
import type { Post } from "../types";

const PostScroll = ({ userId }: { userId: number }) => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    axios
      .get("http://85.65.146.6:9512/user/1/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        // error handling
      });
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostScroll;
