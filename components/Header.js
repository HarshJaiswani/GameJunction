import React from "react";
// Custom Components
import Logo from "./Logo";
// Icons
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
// Framer Motion
import { motion } from "framer-motion";

const Header = () => {
  return (
    <div className="w-full min-h-[60vh] sm:py-8 flex items-center justify-between">
      <motion.div
        initial={{ x: -100 }}
        whileInView={{ x: 0 }}
        className="w-full lg:w-[60%] px-5 sm:px-12"
      >
        <div className="mb-4 sm:my-8">
          <div className="my-4 text-2xl sm:text-3xl font-sans font-semibold text-gray-500">
            Having a hard time to find opportunities to play ?
          </div>
          <div className="font-sans font-semibold text-3xl sm:text-4xl text-green-400">
            We got your back !
          </div>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-lg text-gray-600">Presenting,</span>
          <Logo />
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
      </motion.div>
      <div className="w-[40%] hidden lg:flex items-center justify-center px-12">
        <img src="/assets/hero.svg" className="w-[500px]" alt="" />
      </div>
      {/* It will be a community of all sorts of players wheather be it a physical game or esports the world most estimed community which plays games someway or the other */}
      {/* it will have two segments physical sports and esports */}
    </div>
  );
};

export default Header;
