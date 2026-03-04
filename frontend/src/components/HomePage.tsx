import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import type { ScrollPost } from "../types";
import axios from "axios";
import PostScroll from "./PostScroll";
import { Stack } from "@mui/material";

const HomePage = () => {
  const [cookies,] = useCookies(["access"]);
  const [posts, setPosts] = useState<ScrollPost[]>([]);

  useEffect(() => {
    axios
      .get(`http://85.65.146.6:9512/self/home/posts`,
        { headers: {
          Authorization: `Bearer ${cookies.access.token}`
        }}
      )
      .then((response) => {
        setPosts(response.data);
      });
  }, []);
  
  return (
    <Stack minHeight="100vh" direction="row" justifyContent="center">
      <Stack direction="column">
        <PostScroll posts={posts} />
      </Stack>
    </Stack>
  );
};

export default HomePage;
