import type { User } from "../types";
import { Avatar, Badge, IconButton } from "@mui/material";

const PersonalProfileInfo = ({ user }: { user: User }) => {
  return (
    <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
        <IconButton size="small">
            <EditIcon fontSize="small" />
        </IconButton>
        }
    >
        <Avatar
            src={user.ProfileImage}
            sx={{ width: 120, height: 120 }}
        />
    </Badge>
  );
};

export default PersonalProfileInfo;
