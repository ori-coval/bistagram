import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const EditBioDialog = ({ open, onClose, currentBio, updateBio}: { open: boolean; onClose: () => void; currentBio: string; updateBio: (arg0: string) => void}) => {

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const newBio = formJson.bio;
    updateBio(newBio);
    console.log('New Bio:', newBio);
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Bio</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="edit-bio-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="bio"
              label="New Bio"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={currentBio}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="edit-bio-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditBioDialog;