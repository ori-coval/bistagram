import React from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const NavigationMenu = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} onClick={() => {navigate("/home-page");}} />
        <BottomNavigationAction label="Add" icon={<AddRoundedIcon />} onClick={() => {navigate("/upload-post");}} />
        <BottomNavigationAction label="Search" icon={<SearchRoundedIcon />} onClick={() => {navigate("/user-search");}} />
        <BottomNavigationAction label="Profile" icon={<PersonRoundedIcon />} onClick={() => {navigate("/profile-page");}} />
      </BottomNavigation>
    </Box>
  );
}

export default NavigationMenu;