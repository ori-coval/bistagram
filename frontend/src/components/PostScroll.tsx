import { useState, useEffect } from "react";
import axios from "axios";
import type { Post } from "../types";

const PostScroll = ({ userId }: { userId: string }) => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    axios
      .get("http://IP:PORT/user-posts/" + userId)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        console.error("Error while fetching data: ", err);
      });
  }, []);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.description}</li>
      ))}
    </ul>
  );
};

export default PostScroll;
