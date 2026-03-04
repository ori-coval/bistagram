import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import UploadPostPage from "./components/UploadPostPage";
import "./App.css";
import LoginPage from "./components/LoginPage";
import UserSearchPage from "./components/UserSearchPage";
import { useCookies } from "react-cookie";
import SignupPage from "./components/SignupPage";
import ProfilePage from "./components/ProfilePage";
import HomePage from "./components/HomePage";
import Layout from "./components/Layout";

function App() {
  const [cookies,] = useCookies(["access"]);

  const DynamicProfilePage = () => {
    const params = useParams();
    return (
      <ProfilePage username={(params.username ? params.username : " ")} />
    )
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {(cookies.access && new Date() < new Date(cookies.access.expires) ?
          <>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/profile-page" replace />} />
              <Route path="/home-page" element={<HomePage />} />
              <Route path="/profile-page" element={<ProfilePage username="" />} />
              <Route path="/profile-page/:username" element={<DynamicProfilePage />} />
              <Route path="/user-search" element={<UserSearchPage />} />
              <Route path="/upload-post" element={<UploadPostPage />} />
            </Route>
          </>
        :
          <>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
