import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import type { DialogPost } from "../types";
import CommentsDisplay from "./Comment";

const PostDialogComponent = ({ dialogPost }: { dialogPost: DialogPost }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog
        onClose={handleClose}
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
          <CommentsDisplay dialogPost={dialogPost} />
        </Grid>
        <IconButton
          aria-label="close"
          onClick={handleClose}
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

export default PostDialogComponent;
