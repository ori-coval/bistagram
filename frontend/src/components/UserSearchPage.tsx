import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import type { User } from "../types";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants";

const filter = createFilterOptions<User>();

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

const UserSearchPage = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["access"]);
  // const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [options, setOptions] = useState<readonly User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const placeholder = useMemo(() => "Search users by name", []);

  useEffect(() => {
    setLoading(true);

    axios
      .get<User[]>(BACKEND_URL + "/users/search", {
        params: { search_text: searchValue },
        headers: {
          Authorization: cookies?.access?.token
            ? `Bearer ${cookies.access.token}`
            : "",
        },
      })
      .then((result) => setOptions(result.data || []))
      .finally(() => setLoading(false));
  }, [searchValue]);

  return (
    <Box
      sx={{
        maxWidth: 520,
        minWidth: 260,
        mx: "auto",
        mt: 3,
        px: 2,
      }}
    >
      <Autocomplete
        onChange={(_, chosenUser) =>
          navigate(`/profile-page/${chosenUser ? chosenUser.Username : ""}`)
        }
        ListboxProps={{
          style: {
            maxHeight: "calc(100vh - 220px)",
            overflowY: "auto",
          },
        }}
        open={true}
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
            const aStarts = (a.Username || "").toLowerCase().startsWith(input);
            const bStarts = (b.Username || "").toLowerCase().startsWith(input);

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
              gap: 1.5,
              alignItems: "center",
              "&:hover": { backgroundColor: "action.hover" },
            }}
            elevation={0}
          >
            <Avatar
              sx={{ width: 40, height: 40 }}
              src={option.ProfileImage}
            ></Avatar>
            <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <Typography noWrap variant="body2">
                <Highlight text={option.Username} query={state.inputValue} />
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
                  height: 48,
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
          "& .MuiAutocomplete-paper": { borderRadius: 2, overflow: "hidden" },
        }}
      />
    </Box>
  );
};

export default UserSearchPage;
