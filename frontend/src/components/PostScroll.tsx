import { useState, useEffect } from "react";
import axios from "axios";
import type { Post } from "../types";

const PostScroll = ({ userId }: { userId: number }) => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    axios
      .get(`http://85.65.146.6:9512/user/${userId}/posts`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
