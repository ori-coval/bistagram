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
          return word.startsWith("@") && usernames.includes(word.slice(1)) ? (
            <span
              key={index}
              onClick={() => {
                navigate(`/profile-page/${word.slice(1)}`);
              }}
              style={{ color: "#0062f6", cursor: "pointer" }}
            >
              {word}
            </span>
          ) : (
            word
          );
        })}
      </>
    </Typography>
  );
};

export default PostDescription;
