import React, { useContext } from "react";
// Next Components
import Link from "next/link";
// Custom Components
import Logo from "./Logo";
import NavDropdown from "./NavDropdown";
// Context
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { isLoggedIn } = useContext(AppContext);
  return (
    <div className="py-8 px-12 flex items-center justify-between">
      <Logo />
      <div className="flex items-center justify-evenly">
        <Link href="/list">
          <button className="tracking-wider hover:bg-yellow-200 shadow-sm bg-gray-100 mx-4 px-4 p-2 rounded-2xl">
            Explore Events
          </button>
        </Link>
        {!isLoggedIn && (
          <Link href="/signin">
            <button className="p-2 rounded-2xl bg-gray-100 hover:bg-yellow-200 shadow-sm px-4 mx-4">
              Sign In
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <Link href="/leaderboard">
            <button className="p-2 rounded-2xl bg-gray-100 hover:bg-yellow-200 shadow-sm px-4 mx-4">
              Leaderboard
            </button>
          </Link>
        )}
        <NavDropdown />
      </div>
    </div>
  );
};

export default Navbar;
