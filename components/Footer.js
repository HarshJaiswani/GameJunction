import React from "react";
// Next Components
import Link from "next/link";
// Custom Components
import Logo from "./Logo";
// Icons
import { FaTelegramPlane } from "react-icons/fa";
import { ImTwitter } from "react-icons/im";
import { TfiLinkedin } from "react-icons/tfi";
import { IoMail } from "react-icons/io5";
// import { IoLogoDiscord } from "react-icons/io5";
import { SiGithub, SiInstagram } from "react-icons/si";

const Footer = () => {
  const iconStyle = "text-gray-400 hover:text-white mx-4 text-2xl sm:text-3xl";
  const libStyle = "text-white hover:text-yellow-200 mr-4";
  return (
    <div className="w-full bg-gray-800 px-8 py-8 md:py-16">
      <div className="flex items-center flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/2">
          <div className="mb-8">
            <Logo />
          </div>
          <p className="text-2xl sm:text-3xl w-full font-semibold font-sans text-gray-500">
            Experience your
            <span className="text-orange-400"> gaming journey</span> at this
            junction with us called
            <span className="text-cyan-400"> GameJunction</span> !
          </p>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0 flex items-center justify-center">
          <div className="flex items-center">
            <Link href="https://t.me/GameJunction_official" target="_blank">
              <FaTelegramPlane className={iconStyle} />
            </Link>
            <Link href="https://twitter.com/Game_junction_" target="_blank">
              <ImTwitter className={iconStyle} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/game-junction-36006b271/"
              target="_blank"
            >
              <TfiLinkedin className={iconStyle} />
            </Link>
            {/* <Link href="/" target="_blank">
              <IoLogoDiscord className={iconStyle} />
            </Link> */}
            <Link
              href="https://github.com/HarshJaiswani/GameJunction"
              target="_blank"
            >
              <SiGithub className={iconStyle} />
            </Link>
            <Link
              href="https://www.instagram.com/gamejunction_official/"
              target="_blank"
            >
              <SiInstagram className={iconStyle} />
            </Link>
            <Link
              href={`mailto:game.junction.official@gmail.com`}
              target="_blank"
            >
              <IoMail className={`${iconStyle} text-3xl sm:text-4xl`} />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 text-gray-400">
        <span className="text-xl block">Build with amazing libraries like</span>
        <Link
          href="https://react-icons.github.io/react-icons/search"
          className={libStyle}
        >
          React Icons
        </Link>{" "}
        <Link
          href="https://www.framer.com/motion/animation/"
          className={libStyle}
        >
          Framer Motion
        </Link>
        <Link href="https://headlessui.com/" className={libStyle}>
          Headless UI
        </Link>
        <Link href="https://www.chartjs.org/" className={libStyle}>
          Chart Js
        </Link>
        <Link href="https://mongoosejs.com/" className={libStyle}>
          Mongoose
        </Link>
      </div>
    </div>
  );
};

export default Footer;
