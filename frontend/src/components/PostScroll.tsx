import { useState, useEffect } from "react";
import axios from "axios";
import type { Post } from "../types";
import { useCookies } from "react-cookie";

const PostScroll = ({ username }: { username: string }) => {
  const [cookies,] = useCookies(["access"])
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    axios
      .get(`http://85.65.146.6:9512/user/${username}/posts`,
        { headers: {
          Authorization: `Bearer ${cookies.access.token}`
        }}
      )
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
