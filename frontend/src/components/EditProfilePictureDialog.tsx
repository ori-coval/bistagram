import { Button, Stack } from "@mui/material";
import { useRef } from "react";
import React from "react";

const EditProfilePictureDialog = ({updateProfileImage, imageRef} : {updateProfileImage: (arg0: string) => void; imageRef: React.RefObject<HTMLInputElement | null>}) => {
    const loadImage = () => {
    if (!imageRef.current || !imageRef.current.files) {
      return;
    }
    const file = imageRef.current.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      if (reader.result) {
        updateProfileImage(
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
        <input hidden type="file" accept="image/png, image/jpeg" ref={imageRef} onChange={loadImage}/>
      </Stack>
    );
};

export default EditProfilePictureDialog;