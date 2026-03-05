import { useNavigate } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const NavigationMenu = ({current_pathname}: {current_pathname: string}) => {
  const navigate = useNavigate();

  return (
    <BottomNavigation
        value={current_pathname}
        onChange={(_, newValue) => {
          navigate(newValue);
        }}
        sx={{
          width: "100vw",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <BottomNavigationAction
          label="Home"
          value="/home-page"
          icon={<HomeRoundedIcon />}
        />
        <BottomNavigationAction
          label="Upload"
          value="/upload-post"
          icon={<AddRoundedIcon />}
        />
        <BottomNavigationAction
          label="Search"
          value="/user-search"
          icon={<SearchRoundedIcon />}
        />
        <BottomNavigationAction
          label="Profile"
          value="/profile-page"
          icon={<PersonRoundedIcon />}
        />
      </BottomNavigation>
  );
}

export default NavigationMenu;