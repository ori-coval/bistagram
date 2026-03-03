import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import UserPage from "./components/UserPage";
import UploadPostPage from "./components/UploadPostPage";
import "./App.css";
import LoginPage from "./components/LoginPage";
import UserSearchPage from "./components/UserSearchPage";
import { useCookies } from "react-cookie";
import SignupPage from "./components/SignupPage";
import HomePage from "./components/HomePage";

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {cookies.access ?
          <>
            <Route path="/" element={<Navigate to="/home-page" replace />} />
            <Route path="/home-page" element={<HomePage />} />
            <Route path="/user-page/:username" element={<DynamicUserPage />} />
            <Route path="/user-search" element={<UserSearchPage />} />
            <Route path="/upload-post" element={<UploadPostPage />} />
          </>
        :
          <>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
