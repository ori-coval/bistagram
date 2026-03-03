import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import UserPage from "./components/UserPage";
import UploadPostPage from "./components/UploadPostPage";
import "./App.css";
import LoginPage from "./components/LoginPage";
import UserSearchPage from "./components/UserSearchPage";
import { useCookies } from "react-cookie";

function App() {
  const [cookies,] = useCookies(["access"]);

  const DynamicUserPage = () => {
    let params = useParams();
    return (
      <UserPage username={(params.username ? params.username : "")} />
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {cookies.access ?
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home-page" element={<UserPage username={cookies.access.username}/>} />
            <Route path="/user-page/:username" element={<DynamicUserPage />} />
            <Route path="/user-search" element={<UserSearchPage />} />
            <Route path="/upload-post" element={<UploadPostPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </>
        :
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
