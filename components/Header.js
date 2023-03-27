import React from "react";
// Custom Components
import Logo from "./Logo";
// Icons
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import { SiPhpmyadmin } from "react-icons/si";
import { IoCubeOutline } from "react-icons/io5";
import { HiStar } from "react-icons/hi";
import { HiCog6Tooth, HiBolt } from "react-icons/hi2";
import { TbCricket } from "react-icons/tb";
import { CiTrophy } from "react-icons/ci";

const Header = () => {
  const iconColor = "text-green-100";
  return (
    <div className="w-full min-h-[60vh] py-12 flex items-center justify-center flex-col relative">
      <div>
        <SiPhpmyadmin
          className={`absolute top-40 left-20 text-3xl ${iconColor}`}
        />
        <IoCubeOutline
          className={`absolute top-56 right-10 text-3xl ${iconColor}`}
        />
        <HiStar className={`absolute top-24 right-56 text-3xl ${iconColor}`} />
        <TbCricket
          className={`absolute top-72 right-96 text-3xl ${iconColor}`}
        />
        <CiTrophy className={`absolute top-80 left-36 text-3xl ${iconColor}`} />
        <HiBolt className={`absolute top-40 right-46 text-3xl ${iconColor}`} />
        <HiCog6Tooth
          className={`absolute bottom-24 right-36 text-3xl ${iconColor}`}
        />
      </div>
      <div className="w-2/3">
        <div className="my-8">
          <div className="my-4 text-3xl font-sans font-semibold text-gray-500">
            Having a hard time to find opportunities to play ?
          </div>
          <div className="font-sans font-semibold text-4xl text-green-400">
            We got your back !
          </div>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-lg text-gray-600">Presenting,</span>
          <Logo size="6xl" />
        </div>
        <div className="my-8">
          <BsFillChatSquareQuoteFill className="text-3xl text-yellow-400 mb-4" />
          <span className="tracking-wider mb-4 block">
            A perfect place for you to find events being organised for you
            favourite sport be it a online game like pubg, freefire, minimilitia
            or physical games like cricket, badminton, hockey!{" "}
          </span>
          <span className="block text-lg font-semibold text-red-400">
            Come Let&apos;s Play!
          </span>
        </div>
      </div>
      {/* It will be a community of all sorts of players wheather be it a physical game or esports the world most estimed community which plays games someway or the other */}
      {/* it will have two segments physical sports and esports */}
    </div>
  );
};

export default Header;
