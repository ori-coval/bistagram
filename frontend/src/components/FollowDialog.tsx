import {
  DialogTitle,
  IconButton,
  DialogContent,
  Box,
  Paper,
  Avatar,
  Typography,
  TextField,
  InputAdornment,
  CircularProgress,
  Dialog,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import axios from "axios";
import { useMemo } from "react";
import type { User } from "../types";
import { BACKEND_URL } from "../constants";

const filter = createFilterOptions<User>();

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function Highlight({
  text,
  query: userInput,
}: {
  text: string;
  query: string;
}) {
  if (!userInput) return <>{text}</>;
  const normlizedInput = userInput.trim().toLowerCase();
  const normlizedText = text.toLowerCase();
  const indexOfInputStartInText = normlizedText.indexOf(normlizedInput);
  if (indexOfInputStartInText === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, indexOfInputStartInText)}
      <Box component="span" sx={{ fontWeight: 700, bgcolor: "transparent" }}>
        {text.slice(
          indexOfInputStartInText,
          indexOfInputStartInText + normlizedInput.length,
        )}
      </Box>
      {text.slice(indexOfInputStartInText + normlizedInput.length)}
    </>
  );
}

const FollowDialog = ({
  open,
  onClose,
  searchGroup,
  username,
}: {
  open: boolean;
  onClose: () => void;
  searchGroup: "followers" | "following";
  username: string;
}) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["access"]);
  const [options, setOptions] = useState<readonly User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const placeholder = useMemo(() => "Search users by name", []);

  useEffect(() => {
    setOptions([]);
    setSearchValue("");
  }, [searchGroup, username]);

  useEffect(() => {
    setLoading(true);

    axios
      .get<User[]>(`${BACKEND_URL}/user/${username}/${searchGroup}`, {
        params: { search_text: searchValue },
        headers: {
          Authorization: cookies?.access?.token
            ? `Bearer ${cookies.access.token}`
            : "",
        },
      })
      .then((result) => setOptions(result.data || []))
      .finally(() => setLoading(false));
  }, [searchValue, username, searchGroup, open]);

  return (
    // <div>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
        maxHeight="sm"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2, fontWeight: "bold"}} id="customized-dialog-title">
          {searchGroup[0].toUpperCase() + searchGroup.slice(1)}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box
            sx={{
              width: "100%",
              minHeight: 300,
              mt: 3,
            }}
          >
            <Autocomplete
              onChange={(_, chosenUser) =>
                navigate(
                  `/profile-page/${chosenUser ? chosenUser.Username : ""}`,
                )
              }
              disablePortal
              slotProps={{
                listbox: {
                  sx: {
                    maxHeight: 230,
                    overflowY: "auto",
                  },
                },
              }}
              open={open}
              disableClearable
              forcePopupIcon={false}
              inputValue={searchValue}
              onInputChange={(_, newValue) => setSearchValue(newValue)}
              options={options}
              loading={loading}
              getOptionLabel={(option) => option.Username}
              filterOptions={(options, state) => {
                const optionsFilter = filter(options, state);
                const input = state.inputValue.toLowerCase();

                return optionsFilter.sort((a, b) => {
                  const aStarts = (a.Username || "")
                    .toLowerCase()
                    .startsWith(input);
                  const bStarts = (b.Username || "")
                    .toLowerCase()
                    .startsWith(input);

                  if (aStarts && !bStarts) return -1;
                  if (!aStarts && bStarts) return 1;
                  return 0;
                });
              }}
              renderOption={(props, option, state) => (
                <Paper
                  component="li"
                  {...props}
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    px: 1.5,
                    py: 1,
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                  elevation={0}
                >
                  <Avatar
                    sx={{ width: 34, height: 34 }}
                    src={option.ProfileImage}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      minWidth: 0,
                    }}
                  >
                    <Typography noWrap variant="body2">
                      <Highlight
                        text={option.Username}
                        query={state.inputValue}
                      />
                    </Typography>
                  </Box>
                </Paper>
              )}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    label="Find users"
                    placeholder={placeholder}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      sx: {
                        borderRadius: 999,
                        boxShadow: 1,
                      },
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <>
                          {searchValue && (
                            <IconButton
                              size="small"
                              onClick={() => setSearchValue("")}
                            >
                              <ClearIcon fontSize="small" />
                            </IconButton>
                          )}

                          {loading && (
                            <CircularProgress color="inherit" size={20} />
                          )}

                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                );
              }}
              sx={{
                width: "100%",
                "& .MuiAutocomplete-paper": {
                  borderRadius: 2,
                  overflow: "hidden",
                },
              }}
            />
          </Box>
        </DialogContent>
      </BootstrapDialog>
    // </div>
  );
};

export default FollowDialog;
