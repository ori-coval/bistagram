import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserPage from "./components/UserPage";
import UploadPostPage from "./components/UploadPostPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav>
        | <Link to="/">User Page</Link> |{" "}
        <Link to="/upload-post">Upload Post</Link> |{" "}
      </nav>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/upload-post" element={<UploadPostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
