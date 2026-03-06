import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import type { DialogPost } from "../types";
import CommentsDisplay from "./CommentsDisplay";
import { useMediaQuery, useTheme } from "@mui/material";

const PostDialog = ({
  dialogPost,
  usernames,
  changeLikeStatus,
  open,
  onClose,
  createComment,
}: {
  dialogPost: DialogPost;
  usernames: string[];
  changeLikeStatus: (arg1: number, arg2: boolean) => void;
  open: boolean;
  onClose: () => void;
  createComment: (PostID: number, Comment: string) => void;
}) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    dialogPost ?
    <div>
      <Dialog
        onClose={onClose}
        open={open}
        maxWidth={false}
        PaperProps={{
          sx: {
            height: "90%",
            width: "90%",
            backgroundColor: "#212328",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            overflow: "auto",
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
              minHeight: 300,
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        <Box
          sx={{
            minHeight: 300,
            flex: 3,
            display: "flex",
            flexDirection: "column",
            borderLeft: "1px solid #333",
          }}
        >
          <CommentsDisplay
            dialogPost={dialogPost}
            usernames={usernames}
            createComment={createComment}
            changeLikeStatus={changeLikeStatus}
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
    :
    <></>
  );
};

export default PostDialog;
