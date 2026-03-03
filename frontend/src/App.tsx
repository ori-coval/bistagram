import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import UserPage from "./components/UserPage";
import UploadPostPage from "./components/UploadPostPage";
import "./App.css";
import LoginPage from "./components/LoginPage";

function App() {

  const DynamicUserPage = () => {
    let params = useParams();
    return (
      <UserPage userId={parseInt(params.userId ? params.userId : "")} />
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-page/:userId" element={<DynamicUserPage />} />
        <Route path="/upload-post" element={<UploadPostPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
