import React from "react";
// Next Components
import Link from "next/link";
// Custom Components
import Logo from "./Logo";
// Icons
import { FaTelegramPlane } from "react-icons/fa";
import { ImTwitter } from "react-icons/im";
import { TfiLinkedin } from "react-icons/tfi";
import { IoLogoDiscord } from "react-icons/io5";
import { SiGithub } from "react-icons/si";

const Footer = () => {
  const iconStyle = "text-gray-400 hover:text-white mx-4 text-3xl";
  return (
    <div className="w-full bg-gray-800 px-8 py-24 flex items-center justify-between">
      <div className="w-1/2">
        <div className="mb-8">
          <Logo />
        </div>
        <p className="text-3xl w-full font-semibold font-sans text-gray-500">
          Experience your
          <span className="text-orange-400"> gaming journey</span> at this
          junction with us called
          <span className="text-cyan-400"> GameJunction</span> !
        </p>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="flex items-center">
          <Link href="/">
            <FaTelegramPlane className={iconStyle} />
          </Link>
          <Link href="/">
            <ImTwitter className={iconStyle} />
          </Link>
          <Link href="/">
            <TfiLinkedin className={iconStyle} />
          </Link>
          <Link href="/">
            <IoLogoDiscord className={iconStyle} />
          </Link>
          <Link href="/">
            <SiGithub className={iconStyle} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
