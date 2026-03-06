import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import UploadPostForm from "./UploadPostForm";
import { Stack } from "@mui/material";
import { BACKEND_URL } from "../constants";

async function resizeBase64Image(base64: string): Promise<string> {
  const img = new Image();
  img.src = base64;

  await new Promise<void>((resolve) => {
    img.onload = () => resolve();
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  const maxSize = 2000;

  let { width, height } = img;

  if (width > height) {
    if (width > maxSize) {
      height *= maxSize / width;
      width = maxSize;
    }
  } else {
    if (height > maxSize) {
      width *= maxSize / height;
      height = maxSize;
    }
  }

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL("image/jpeg", 0.85);
}

const UploadPostPage = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["access"]);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const submitPost = async () => {
    if (!description || !image) {
      return;
    }

    const compressedImage = await resizeBase64Image(image);
    axios
      .post(
        BACKEND_URL + "/upload-post",
        {
          Description: description,
          Image: compressedImage,
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
