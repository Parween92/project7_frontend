import { NavLink } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Navbar() {
  return (
    <header className="bg-primary ">
      <nav className=" flex items-center justify-between pl-8 pr-8">
        <NavLink to="">
          <img
            src="/Website-Logo.png"
            alt="Website-Logo"
            className="w-[80px]"
          />
        </NavLink>

        <ul className="flex gap-8">
          {/* <li className="text-[#f6c30a] font-bold hover:underline hover:text-[#544100]">
            <NavLink to="/Home">Home</NavLink>
          </li> */}
          <li className="text-accent font-bold  hover:text-white">
            <NavLink className="flex items-center" to="/posts">
              Add Post
              <DotLottieReact
                src="https://lottie.host/28982f4f-26cc-40aa-92fa-1b1d57a34c78/AmokKFs5qg.lottie"
                loop
                autoplay
                style={{ width: 80, height: 80 }}
              />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
