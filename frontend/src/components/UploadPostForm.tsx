import { Button, Card, CardHeader, CardMedia, FilledInput, Input, Stack, TextField } from "@mui/material";
import { useRef } from "react";

const UploadPostForm = ({
  image,
  setImage,
  setDescription,
  submitPost,
}: {
  image: string;
  setImage: (arg: string) => void;
  setDescription: (arg: string) => void;
  submitPost: () => void;
}) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const loadImage = () => {
    if (!imageRef.current || !imageRef.current.files) {
      return;
    }
    const file = imageRef.current.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      if (reader.result) {
        setImage(
          reader.result instanceof ArrayBuffer
            ? new TextDecoder().decode(reader.result)
            : reader.result,
        );
      }
    });

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Stack direction="column" alignItems="center">
      <Card sx={{ width: 500, boxShadow: "none" }}>
        <CardHeader></CardHeader>
        <CardMedia component="img" src={image} sx={{ marginBottom: 1 }}/>
      </Card>
      <input hidden type="file" accept="image/png, image/jpeg" ref={imageRef} onChange={loadImage}/>
      <Button variant="text" onClick={() => { imageRef.current ? imageRef.current.click() : {} }}>Choose Image</Button>
      <br />
      <TextField fullWidth multiline onChange={(e) => setDescription(e.target.value)} />
      <br />
      <Button variant="contained" onClick={submitPost}>Upload</Button>
    </Stack>
  );
};

export default UploadPostForm;
