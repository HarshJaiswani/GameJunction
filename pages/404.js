import React from "react";
// Next Components
import Link from "next/link";
// Icons
import { BiError } from "react-icons/bi";
import { HiOutlineHome } from "react-icons/hi";

const Error404 = () => {
  return (
    <div className="flex items-center justify-center flex-col w-full min-h-screen">
      <BiError className="text-[7rem] md:text-[10rem] text-yellow-500" />
      <div className="text-3xl md:text-5xl my-4">404 Page Not Found!</div>
      <Link href="/">
        <button className="px-6 py-2 font-semibold text-green-400 flex items-center justify-center rounded-full bg-white shadow border my-4">
          <HiOutlineHome className="text-lg mr-2" /> Return Home
        </button>
      </Link>
    </div>
  );
};

export default Error404;
