import React, { useContext, useState } from "react";
// Next Components
import Link from "next/link";
// Custom Components
import Logo from "./Logo";
import NavDropdown from "./NavDropdown";
// Context
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { isLoggedIn } = useContext(AppContext);
  const [isAtTop, setIsAtTop] = useState(true);
  return (
    <>
      <div className={`w-full fixed top-0 left-0 bg-white z-[100]`}>
        <div className="py-6 sm:py-6 px-8 sm:px-12 flex items-center justify-between">
          <Logo />
          <div className="flex items-center justify-between">
            <div className="hidden md:flex items-center justify-evenly">
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
            </div>
            <NavDropdown />
          </div>
        </div>
        <div className="md:hidden flex items-center justify-end mr-8">
          <Link href="/list">
            <button className="tracking-wider text-sm sm:text-base hover:bg-yellow-200 shadow-sm bg-gray-100 mx-2 sm:mx-4 px-4 py-2 rounded-2xl">
              Explore Events
            </button>
          </Link>
          {!isLoggedIn && (
            <Link href="/signin">
              <button className="py-2 text-sm sm:text-base rounded-2xl bg-gray-100 hover:bg-yellow-200 shadow-sm px-4 mx-2 sm:mx-4">
                Sign In
              </button>
            </Link>
          )}
          {isLoggedIn && (
            <Link href="/leaderboard">
              <button className="py-2 text-sm sm:text-base rounded-2xl bg-gray-100 hover:bg-yellow-200 shadow-sm px-4 mx-2 sm:mx-4">
                Leaderboard
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="w-full h-[25vh] sm:h-[15vh]"></div>
    </>
  );
};

export default Navbar;
