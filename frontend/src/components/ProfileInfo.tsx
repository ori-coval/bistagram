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
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";

const ProfileInfo = ({
  profileData,
  isOwnProfile,
  editingBio,
  setEditingBio,
  updateBio,
  onEditAvatar,
  onShowFollowers,
  onShowFollowing,
  onClickFollow,
}: {
  profileData: ProfileData;
  isOwnProfile: boolean;
  editingBio: boolean;
  setEditingBio: (arg: boolean) => void;
  updateBio: (arg: string) => void;
  onEditAvatar: () => void;
  onShowFollowers: () => void;
  onShowFollowing: () => void;
  onClickFollow: () => void;
}) => {
  const [newBio, setNewBio] = useState(profileData.User.Bio);

  return (
    <Container maxWidth="md" sx={{ marginTop: 2 }}>
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
              <Avatar
                src={profileData.User.ProfileImage}
                sx={{ width: 120, height: 120 }}
              >
                {!profileData.User.ProfileImage ? (
                  <AccountCircleIcon sx={{ fontSize: 60 }} />
                ) : (
                  <></>
                )}
              </Avatar>
            </Badge>
          ) : (
            <Avatar
              src={profileData.User.ProfileImage}
              sx={{ width: 120, height: 120 }}
            >
              {!profileData.User.ProfileImage ? (
                <AccountCircleIcon sx={{ fontSize: 60 }} />
              ) : (
                <></>
              )}
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
              {isOwnProfile && editingBio ? (
              <TextField
                multiline
                fullWidth
                onChange={(e) => setNewBio(e.target.value)}
                value={newBio}
              />
              ) : (
              <Typography
                variant="body2"
                whiteSpace="pre-line"
                maxWidth={300}
                sx={{ wordWrap: "break-word" }}
              >
                {profileData.User.Bio}
              </Typography>
              )}
              {isOwnProfile ? (
                (editingBio ?
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => {updateBio(newBio)}}
                  >
                    Done
                  </Button>
                  :
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => {setEditingBio(true)}}
                  >
                    Edit Bio
                  </Button>
                )
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    marginTop: 2,
                    backgroundColor: profileData.AlreadyFollowing
                      ? "#25292e"
                      : "#1976d2",
                  }}
                  onClick={onClickFollow}
                >
                  {profileData.AlreadyFollowing ? "Following" : "Follow"}
                </Button>
              )}
            </Box>
            <Box></Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};
export default ProfileInfo;
