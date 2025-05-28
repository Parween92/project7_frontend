import Home from "./pages/Home.jsx";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
