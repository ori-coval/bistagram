import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import UploadPostForm from "./UploadPostForm";

const UploadPostPage = () => {
  const navigate = useNavigate();
  const [cookies,] = useCookies(["access"]);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  
  const submitPost = () => {
    axios.
      post("http://85.65.146.6:9512/upload-post", {
        Description: description,
        Image: image,
      }, { headers: {
        Authorization: `Bearer ${cookies.access.token}`
      }})
      .then(() => {
        navigate("/profile-page");
      })
    
  };

  return (
    <div>
      <UploadPostForm image={image} setImage={setImage} setDescription={setDescription} submitPost={submitPost} />
    </div>
  );
};

export default UploadPostPage;
