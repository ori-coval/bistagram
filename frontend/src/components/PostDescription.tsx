import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PostDescription = ({
  description,
  usernames,
}: {
  description: string;
  usernames: string[];
}) => {
  const navigate = useNavigate();

  return (
    <Typography sx={{ wordWrap: "break-word" }}>
      <>
        {description.split(/(\s+)/).map((word, index) => {
          word.startsWith("@") && usernames.includes(word.slice(1)) ? (
            <a key={index} onClick={() => {navigate(`/profile/${word.slice(1)}`)}}></a>
          ) : (
            word
          );
        })}
      </>
    </Typography>
  );
};

export default PostDescription;
