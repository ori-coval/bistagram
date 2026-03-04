import type { ProfileData } from "../types";
import {
  Avatar,
  Badge,
  IconButton,
  Container,
  Grid,
  Stack,
  Box,
  Button,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ProfileInfo = ({
  profileData,
  isOwnProfile,
  onEditBio,
  onEditAvatar,
  onShowFollowers,
  onShowFollowing,
}: {
  profileData: ProfileData;
  isOwnProfile: boolean;
  onEditBio: () => void;
  onEditAvatar: () => void;
  onShowFollowers: () => void;
  onShowFollowing: () => void;
}) => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={4} alignItems="center">
        <Grid size={{ xs: 12, sm: 4 }} display="flex" justifyContent="center">
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
              <Avatar src={profileData.User.ProfileImage} sx={{ width: 120, height: 120 }}>
                {!profileData.User.ProfileImage ? (
                  <AccountCircleIcon sx={{ fontSize: 60 }} />
                ) : <></>}
              </Avatar>
            </Badge>
          ) : (
            <Avatar src={profileData.User.ProfileImage} sx={{ width: 120, height: 120 }}>
              {!profileData.User.ProfileImage ? (
                  <AccountCircleIcon sx={{ fontSize: 60 }} />
                ) : <></>}
            </Avatar>
          )}
        </Grid>

        <Grid size={{ xs: 12, sm: 8 }}>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight={500}>
              {profileData.User.Username}
            </Typography>

            <Stack direction="row" spacing={4}>
              <Box>
                <Typography fontWeight="bold">
                  {profileData.Posts.length}
                </Typography>
                <Typography variant="body2">Posts</Typography>
              </Box>

              <Box sx={{ cursor: "pointer" }} onClick={onShowFollowers}>
                <Typography fontWeight="bold">
                  {profileData.FollowersCount}
                </Typography>
                <Typography variant="body2">Followers</Typography>
              </Box>

              <Box sx={{ cursor: "pointer" }} onClick={onShowFollowing}>
                <Typography fontWeight="bold">
                  {profileData.FollowingCount}
                </Typography>
                <Typography variant="body2">Following</Typography>
              </Box>
            </Stack>

            <Box>
              <Typography variant="body2" whiteSpace="pre-line">
                {profileData.User.Bio}
              </Typography>

              {isOwnProfile ? (
                <Button
                  variant="text"
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={onEditBio}
                >
                  Edit Bio
                </Button>
              ) : (
                <></>
              )}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};
export default ProfileInfo;
