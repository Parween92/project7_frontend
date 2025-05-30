import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-primary ">
      <nav className=" flex items-center justify-between pl-8 pr-8">
        <NavLink to="">
          <img src="/Travel-Logo.png" alt="Website-Logo" className="w-[80px]" />
        </NavLink>

        <ul className="flex gap-8">
          {/* <li className="text-[#f6c30a] font-bold hover:underline hover:text-[#544100]">
            <NavLink to="/Home">Home</NavLink>
          </li> */}

          <li className="text-accent font-bold hover:underline hover:text-secondary">
            <NavLink to="/Fav">Fav</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
