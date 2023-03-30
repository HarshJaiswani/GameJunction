import React from "react";
// Next Components
import Link from "next/link";
// Icons
import { BiError } from "react-icons/bi";
import { HiOutlineHome } from "react-icons/hi";

const Admin = () => {
  //   const userStake = "chkbsdhcb";
  //   const userStake = "admin";
  //   const userStake = "organiser";
  const userStake = "participant";
  if (userStake == "participant") {
    return (
      <div className="flex items-center justify-center flex-col w-full min-h-screen">
        <BiError className="text-[10rem] text-[red]" />
        <div className="text-5xl my-4">Access Denied!</div>
        <Link href="/">
          <button className="px-6 py-2 font-semibold text-green-400 flex items-center justify-center rounded-full bg-white shadow border my-4">
            <HiOutlineHome className="text-lg mr-2" /> Return Home
          </button>
        </Link>
      </div>
    );
  } else if (userStake == "organiser") {
    return <>Organiser Code here</>;
  } else if (userStake == "admin") {
    return <>Admin Code here</>;
  } else {
    return (
      <div className="flex items-center justify-center flex-col w-full min-h-screen">
        <BiError className="text-[10rem] text-yellow-500" />
        <div className="text-5xl my-4">Login Required!</div>
        <Link href="/">
          <button className="px-6 py-2 font-semibold text-green-400 flex items-center justify-center rounded-full bg-white shadow border my-4">
            <HiOutlineHome className="text-lg mr-2" /> Return Home
          </button>
        </Link>
      </div>
    );
  }
};

export default Admin;
