import { useCookies } from "react-cookie";
import type { User } from "../types";
import { useState } from "react";
import axios from "axios";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

const filter = createFilterOptions<User>();

const UserSearchPage = () => {
  const [cookies] = useCookies(["access"]);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly User[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleOpen = async () => {
    setOpen(true);
    setLoading(true);

    try {
      const response = await axios.get(
        "http://85.65.146.6:9512/users/search",
        {
          params: { search_text: searchValue },
          headers: {
            Authorization: `Bearer ${cookies.access.token}`,
          },
        }
      );

      setOptions(response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  return (
    <Autocomplete
      sx={{ width: 300 }}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      inputValue={searchValue}
      onInputChange={(_event, newInputValue) => {
        setSearchValue(newInputValue);
      }}
      options={options}
      loading={loading}
      isOptionEqualToValue={(option, value) => option.ID === value.ID}
      getOptionLabel={(option) =>
        option.Username?.trim() ? option.Username : `User ${option.ID}`
      }
      filterOptions={(options, state) => {
        const filtered = filter(options, state);
        const input = state.inputValue.toLowerCase();

        return filtered.sort((a, b) => {
          const aStarts = a.Username.toLowerCase().startsWith(input);
          const bStarts = b.Username.toLowerCase().startsWith(input);

          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;

          return 0;
        });
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="User search"
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  );
};

export default UserSearchPage;