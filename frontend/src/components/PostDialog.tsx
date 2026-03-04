import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import type { DialogPost } from "../types";
import CommentsDisplay from "./CommentsDisplay";

const PostDialog = ({ dialogPost, open, onClose }: { dialogPost: DialogPost; open: boolean; onClose: () => void }) => {

  return (
    <div>
      <Dialog
        onClose={onClose}
        open={open}
        maxWidth={"md"}
        PaperProps={{ sx: { height: "90%", overflow: "hidden", maxWidth: "90%", width: "90%" } }}
      >
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          style={{ backgroundColor: "#212328", height: "100%" }}
        >
          <img
          src={dialogPost.RawImages[0]}
            width={"70%"}
            style={{maxHeight: "90%"}}
          />
          <CommentsDisplay comments={dialogPost.Comments} />
        </Grid>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={() => ({
            position: "fixed",
            right: 8,
            top: 8,
            color: "white",
            scale: "1.1",
          })}
        >
          <CloseIcon />
        </IconButton>
      </Dialog>
    </div>
  );
};

export default PostDialog;
