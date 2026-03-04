import type { ProfileUser } from "../types";
import { Avatar, Badge, IconButton, Container, Grid, Stack, Box, Button, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProfileInfo = ({ user, isOwnProfile, onEditBio, onEditAvatar, onShowFollowers, onShowFollowing }: { user: ProfileUser, isOwnProfile: boolean, onEditBio: () => void, onEditAvatar: () => void, onShowFollowers: () => void, onShowFollowing: () => void }) => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={4} alignItems="center">
        <Grid size={{ xs: 12, sm: 4 }} display="flex" justifyContent="center">
          {/* Avatar */}
          {isOwnProfile ? (
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <IconButton size="small" onClick={onEditAvatar}>
                  <EditIcon fontSize="small" />
                </IconButton>
              }
            >
              <Avatar src={user.ProfileImage} sx={{ width: 120, height: 120 }}>
              {!user.ProfileImage && <AccountCircleIcon sx={{ fontSize: 60 }} />}
              </Avatar>
            </Badge>
          ) : (
            <Avatar sx={{ width: 120, height: 120 }}>
              {!user.ProfileImage && <AccountCircleIcon sx={{ fontSize: 60 }} />}
            </Avatar>
          )}
        </Grid>
        
        {/* Profile Info */}
        <Grid size={{ xs: 12, sm: 8 }}>
          <Stack spacing={2}>
            {/* Username */}
            <Typography variant="h6" fontWeight={500}>
              {user.Username}
            </Typography>

            {/* Counters */}
            <Stack direction="row" spacing={4}>
              <Box>
                <Typography fontWeight="bold">
                  {21} /*TODO: user.Posts.length*/
                </Typography>
                <Typography variant="body2">Posts</Typography>
              </Box>

              <Box sx={{ cursor: "pointer" }} onClick={onShowFollowers}>
                <Typography fontWeight="bold">
                  {405} /*TODO: user.Followers.length*/
                </Typography>
                <Typography variant="body2">Followers</Typography>
              </Box>

              <Box sx={{ cursor: "pointer" }} onClick={onShowFollowing}>
                <Typography fontWeight="bold">
                  {512}  /*TODO: user.Following.length*/
                </Typography>
                <Typography variant="body2">Following</Typography>
              </Box>
            </Stack>

            {/* Bio */}
            <Box>
              <Typography variant="body2" whiteSpace="pre-line">
                {user.Bio}
              </Typography>

              {isOwnProfile && (
                <Button
                  variant="text"
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={onEditBio}
                >
                  Edit Bio
                </Button>
              )}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
export default ProfileInfo;
