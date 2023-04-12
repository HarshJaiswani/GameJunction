import React, { useEffect } from "react";
// Next Components
import Link from "next/link";
import Script from "next/script";
// Icons
import { HiOutlineHome } from "react-icons/hi";
// Components

const Congrats = ({
  message = "Your Account has been created successfully!",
}) => {
  return (
    <div className="w-full min-h-screen text-gray-500 flex-col flex items-center justify-center">
      <h2 className="text-5xl text-center text-green-400 my-4">
        Congratulations!
      </h2>
      <p className="text-xl">{message}</p>
      <Link href="/">
        <button className="px-6 py-2 font-semibold text-green-400 flex items-center justify-center rounded-full bg-white shadow border my-4">
          <HiOutlineHome className="text-lg mr-2" /> Return Home
        </button>
      </Link>
    </div>
  );
};

export default Congrats;
