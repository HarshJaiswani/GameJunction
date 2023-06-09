import React, { useEffect, useState } from "react";
// Next Components
import Link from "next/link";
// Icons
import { BiError } from "react-icons/bi";
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
// Custom Components
import AppAdmin from "../components/AdminScreens/AppAdmin";
import Organiser from "../components/AdminScreens/Organiser";
// hooks
import useUser from "../hooks/useUser";

const Admin = () => {
  const { user } = useUser();

  const [userStake, setUserStake] = useState(null);

  useEffect(() => {
    if (user) {
      if (user.is_participant) {
        setUserStake("participant");
      }
      if (user.is_organiser && !user.is_admin) {
        setUserStake("organiser");
      }
      if (!user.is_organiser && user.is_admin) {
        setUserStake("admin");
      }
      if (user.is_organiser && user.is_admin) {
        setUserStake("both");
      }
    }
  }, [user]);

  if (userStake == "participant") {
    return (
      <div className="flex items-center justify-center flex-col w-full min-h-screen">
        <BiError className="text-[7rem] md:text-[10rem] text-[red]" />
        <div className="text-3xl md:text-5xl my-4">Access Denied!</div>
        <Link href="/">
          <button className="px-6 py-2 font-semibold text-green-400 flex items-center justify-center rounded-full bg-white shadow border my-4">
            <HiOutlineHome className="text-lg mr-2" /> Return Home
          </button>
        </Link>
      </div>
    );
  } else if (userStake == "organiser") {
    return <Organiser />;
  } else if (userStake == "admin") {
    return <AppAdmin />;
  } else if (userStake == "both") {
    return (
      <div className="w-full flex-col bg-gray-50 min-h-screen flex items-center justify-center">
        <button
          onClick={() => setUserStake("organiser")}
          className="w-[300px] hover:bg-yellow-200 px-8 py-2 text-xl text-gray-500 bg-white shadow rounded-full flex items-center my-4"
        >
          <BsFillPersonFill className="mr-2 text-green-400" /> Proceed as
          Organiser
        </button>
        <button
          onClick={() => setUserStake("admin")}
          className="w-[300px] px-8 py-2 text-xl hover:bg-yellow-200 text-gray-500 bg-white shadow rounded-full flex items-center my-4"
        >
          <MdOutlineAdminPanelSettings className="mr-2 text-green-400" />{" "}
          Proceed as AppAdmin
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center flex-col w-full min-h-screen">
        <BiError className="text-[7rem] md:text-[10rem] text-yellow-500" />
        <div className="text-3xl md:text-5xl my-4">Login Required!</div>
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
