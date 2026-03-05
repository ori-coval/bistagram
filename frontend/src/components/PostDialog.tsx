import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import type { DialogPost } from "../types";
import CommentsDisplay from "./CommentsDisplay";

const PostDialog = ({
  dialogPost,
  open,
  onClose,
  createComment,
}: {
  dialogPost: DialogPost;
  open: boolean;
  onClose: () => void;
  createComment: (PostID: number, Comment: string) => void;
}) => {
  return (
    <div>
      <Dialog
        onClose={onClose}
        open={open}
        maxWidth={false}
        PaperProps={{
          sx: {
            height: "90vh",
            width: "90vw",
            backgroundColor: "#212328",
            display: "flex",
            flexDirection: "row",
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            flex: 7,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <img
            src={dialogPost.RawImages[0]}
            loading="lazy"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 3,
            display: "flex",
            flexDirection: "column",
            borderLeft: "1px solid #333",
          }}
        >
          <CommentsDisplay
            comments={dialogPost.Comments}
            postID={dialogPost.ID}
            createComment={createComment}
          />
        </Box>

        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Dialog>
    </div>
  );
};

export default PostDialog;
