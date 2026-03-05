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
import type { User } from "../types";
import { useNavigate } from "react-router-dom";

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
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [options, setOptions] = useState<readonly User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const placeholder = useMemo(() => "Search users by name", []);

  useEffect(() => {
    setLoading(true);

    axios
      .get<User[]>("http://85.65.146.6:9512/users/search", {
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
        width: "100%",
        maxWidth: 520,
        minWidth: 260,
        mx: "auto",
        mt: 3,
        px: 2,
      }}
    >
      <Autocomplete
        onChange={(_, chosenUser) => navigate(`/profile-page/${chosenUser ? chosenUser.Username : ""}`)}
        open={searchBarOpen}
        onOpen={() => setSearchBarOpen(true)}
        onClose={() => setSearchBarOpen(false)}
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
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
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
