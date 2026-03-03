import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const UploadPostForm = () => {
  const navigate = useNavigate();
  const [cookies,] = useCookies(["access"]);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);
  

  const submitPost = () => {
    axios.
      post("http://85.65.146.6:9512/upload-post", {
        Description: description,
        image: image,
      }, { headers: {
        Authorization: `Bearer ${cookies.access.token}`
      }})
      .then(() => {
        navigate("/home-page");
      })
    
  };

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
      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={imageRef}
        onChange={loadImage}
      />
      <br />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button onClick={submitPost}>Upload</button>
      <br />
      <p>Des: {description}</p>
      <br />
      <p>{image.length}</p>
      <br />
      <img src={image} />
    </div>
  );
};

export default UploadPostForm;
