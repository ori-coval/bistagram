import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import UploadPostForm from "./UploadPostForm";
import { Stack } from "@mui/material";

const UploadPostPage = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["access"]);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const submitPost = () => {
    if (!description || !image) {
      return;
    }
    axios
      .post(
        "http://85.65.146.6:9512/upload-post",
        {
          Description: description,
          Image: image,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.access.token}`,
          },
        },
      )
      .then(() => {
        navigate("/profile-page");
      });
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "93vh" }}
    >
      <UploadPostForm
        image={image}
        setImage={setImage}
        setDescription={setDescription}
        submitPost={submitPost}
      />
    </Stack>
  );
};

export default UploadPostPage;
