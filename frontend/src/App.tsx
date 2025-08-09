import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import CreatePage from "./pages/CreatePage.tsx";
import FolderDetailPage from "./pages/FolderDetailsPage.tsx";

function App() {
  return (
    <>
      {/* Toast container - global */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <ThemeProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/create/:folderId" element={<CreatePage />} />
        <Route path="/folder/:folderId" element={<FolderDetailPage />} />
        </Routes>


      </ThemeProvider>
    </>
  );
}

export default App;
