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
import SharedPostPage from "./components/SharedPostPage";

function App() {
  const [cookies,] = useCookies(["access"]);

  const DynamicProfilePage = () => {
    const params = useParams();
    return (
      <ProfilePage username={(params.username ? params.username : "")} />
    )
  };

  const DynamicSharedPostPage = () => {
    const params = useParams();
    return (
      <SharedPostPage postID={(params.postID ? Number(params.postID) : -1)} />
    )
  };

  const DynamicSharedPostPageLogin = () => {
    const params = useParams();
    return (
      <LoginPage nextPage={`/post/${params.postID}`} />
    )
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage nextPage="/home-page"/>} />
        <Route path="/signup" element={<SignupPage />} />
        {(cookies.access && new Date() < new Date(cookies.access.expires) ?
          <>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/home-page" replace />} />
              <Route path="/home-page" element={<HomePage />} />
              <Route path="/profile-page" element={<ProfilePage username="" />} />
              <Route path="/profile-page/:username" element={<DynamicProfilePage />} />
              <Route path="/user-search" element={<UserSearchPage />} />
              <Route path="/upload-post" element={<UploadPostPage />} />
              <Route path="/post/:postID" element={<DynamicSharedPostPage />}/>
            </Route>
          </>
        :
          <>
            <Route path="/post/:postID" element={<DynamicSharedPostPageLogin />}/>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
