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
    <div>
      {image ? <img src={image} /> : <></>}
      <br />
      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={imageRef}
        onChange={loadImage}
      />
      <br />
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button onClick={submitPost}>Upload</button>
    </div>
  );
};

export default UploadPostForm;
