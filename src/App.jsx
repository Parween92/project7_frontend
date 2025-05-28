import Home from "./pages/Home.jsx";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import postDetails from "./pages/postDetails.jsx";

function App() {
  return (
    <>
      <Routes>
        {/* Route MainLayout für die Seite */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="postDetails" element={<postDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
