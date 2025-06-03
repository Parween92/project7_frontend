import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    //Footer muss unten ausgerichtet werden:
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Navbar />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
