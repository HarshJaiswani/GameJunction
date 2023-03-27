import React, { Fragment, useState } from "react";
// Next components
import Link from "next/link";
// Headless Ui
import { Menu, Transition } from "@headlessui/react";
// Icons
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { HiStar, HiLogout } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { BsCalendarEvent } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import {
  MdOutlineHelpOutline,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";

const iconStyle = "text-lg mr-2";

const menuItems = [
  {
    name: "Profile",
    icon: <CgProfile className={iconStyle} />,
    link: "/profile",
    stake: "",
  },
  {
    name: "Create Event",
    icon: <IoCreateOutline className={iconStyle} />,
    link: "/organise-event",
    stake: "organiser",
  },
  {
    name: "My Participations",
    icon: <BsCalendarEvent className={`text-base ${iconStyle}`} />,
    link: "/",
    stake: "participant",
  },
  {
    name: "Admin Panel",
    icon: <MdOutlineAdminPanelSettings className={iconStyle} />,
    link: "/admin",
    stake: "organiser",
  },
  {
    name: "Wishlist",
    icon: <HiStar className={iconStyle} />,
    link: "/",
    stake: "participant",
  },
  {
    name: "Contact team",
    icon: <MdOutlineHelpOutline className={iconStyle} />,
    link: "/contact",
    stake: "",
  },
  {
    name: "Logout",
    icon: <HiLogout className={iconStyle} />,
    link: "/",
    stake: "",
  },
];

const NavDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="mx-8">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="rounded-full p-2 cursor-pointer bg-gray-600 shadow-md">
            <HiOutlineBars3BottomLeft className="text-white text-2xl" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute px-4 py-1 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-400 rounded-md text-white bg-gray-600 shadow">
            {menuItems.map(
              (item, index) =>
                item.stake != "participant" && (
                  <div key={index} className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link href={item.link}>
                          <button
                            className={`${
                              active ? "bg-gray-500 text-white" : "text-white"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {item.icon}
                            {item.name}
                          </button>
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                )
            )}
          </Menu.Items>
        </Transition>
      </Menu>
      {showDropdown && <div></div>}
    </div>
  );
};

export default NavDropdown;
