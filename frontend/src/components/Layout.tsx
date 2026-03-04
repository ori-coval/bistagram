import { Outlet, useLocation} from "react-router-dom";
import Box from "@mui/material/Box";
import NavigationMenu from "./NavigationMenu";

const Layout = () => {
  const location = useLocation();
  return (
    <Box sx={{ pb: 7 }}>
      <Outlet />
      <NavigationMenu current_pathname={location.pathname}/>
    </Box>
  );
};

export default Layout;