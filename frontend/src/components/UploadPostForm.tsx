import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRef } from "react";

const UploadPostForm = ({
  image,
  setImage,
  setDescription,
  submitPost,
  uploadError,
  setUploadError,
}: {
  image: string;
  setImage: (arg: string) => void;
  setDescription: (arg: string) => void;
  submitPost: () => void;
  uploadError: string;
  setUploadError: (arg: string) => void;
}) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const loadImage = () => {
    setUploadError("");
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
      <Card
        sx={{
          width: { xs: "100%", sm: 400, md: 500 },
          maxWidth: 500,
          boxShadow: "none",
          backgroundColor: "transparent",
        }}
      >
        <CardMedia
          component="img"
          src={image}
          sx={{ marginBottom: 1, maxHeight: 400, objectFit: "contain" }}
        />
      </Card>
      <input
        hidden
        type="file"
        accept="image/png, image/jpeg"
        ref={imageRef}
        onChange={loadImage}
      />
      <Button
        variant="text"
        onClick={() => {
          imageRef.current ? imageRef.current.click() : {};
        }}
      >
        Choose Image
      </Button>
      <br />
      <TextField
        label="Description"
        fullWidth
        multiline
        onChange={(e) => {
          setDescription(e.target.value);
          setUploadError("");
        }}
      />
      <Typography
        variant="body2"
        color="red"
        fontSize={16}
        hidden={uploadError == ""}
        sx={{ textAlign: "center" }}
      >
        {uploadError}.
      </Typography>
      <br />
      <Button variant="contained" onClick={submitPost}>
        Upload
      </Button>
    </Stack>
  );
};

export default UploadPostForm;
