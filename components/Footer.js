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
import { SiGithub, SiInstagram } from "react-icons/si";

const Footer = () => {
  const iconStyle = "text-gray-400 hover:text-white mx-4 text-3xl";
  return (
    <div className='w-full bg-gray-800 px-8 py-24 flex items-center justify-between'>
      <div className='w-1/2'>
        <div className='mb-8'>
          <Logo />
        </div>
        <p className='text-3xl w-full font-semibold font-sans text-gray-500'>
          Experience your
          <span className='text-orange-400'> gaming journey</span> at this
          junction with us called
          <span className='text-cyan-400'> GameJunction</span> !
        </p>
      </div>
      <div className='w-1/2 flex items-center justify-center'>
        <div className='flex items-center'>
          <Link href='https://t.me/GameJunction_official' target='_blank'>
            <FaTelegramPlane className={iconStyle} />
          </Link>
          <Link href='https://twitter.com/Game_junction_' target='_blank'>
            <ImTwitter className={iconStyle} />
          </Link>
          <Link
            href='https://www.linkedin.com/in/game-junction-36006b271/'
            target='_blank'>
            <TfiLinkedin className={iconStyle} />
          </Link>
          <Link href='/' target='_blank'>
            <IoLogoDiscord className={iconStyle} />
          </Link>
          <Link
            href='https://github.com/HarshJaiswani/GameJunction'
            target='_blank'>
            <SiGithub className={iconStyle} />
          </Link>
          <Link
            href='https://www.instagram.com/gamejunction_official/'
            target='_blank'>
            <SiInstagram className={iconStyle} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
