import React, { useEffect } from "react";
// Next Components
import Link from "next/link";
// Custom Components
import Header from "../components/Header";
import About from "../components/About";
// Icons
import { ImAndroid } from "react-icons/im";

const Home = () => {
  return (
    <div className="pt-8">
      <Header />
      <div className="w-full px-12 py-8 flex items-center justify-center flex-col">
        <p className="text-lg md:text-2xl font-semibold text-gray-400">
          For more
        </p>
        <h2 className="text-3xl md:text-5xl text-center font-semibold text-gray-500">
          Seamless and Stable Experience
        </h2>
        <p className="text-lg md:text-2xl font-semibold text-gray-400">Try</p>
        <Link
          href="/gamejunction.apk"
          download={true}
          className="px-6 py-2 my-8 rounded-full bg-white shadow-md w-fit flex items-center justify-center outline-none border-none"
        >
          <ImAndroid className="mr-4 text-green-400 text-xl" />
          <span className="text-green-400 font-semibold">Download App</span>
        </Link>
      </div>
      <About />
      <div className="w-[90%] mb-16 p-8 sm:p-12 flex flex-wrap items-center justify-between mx-auto rounded-2xl shadow bg-gradient-to-r from-[#091921] to-cyan-500">
        <div>
          <h2 className="text-2xl sm:text-3xl text-[white]">
            Have a unique game in mind ?
          </h2>
          <p className="my-2 text-lg sm:text-xl text-white">
            Suggest us to add it in our list !
          </p>
        </div>
        <Link href="/suggest-game">
          <button className="px-6 py-2 mt-4 sm:mt-0 rounded-full bg-white hover:bg-yellow-300 shadow text-gray-500 font-semibold">
            Suggest Game
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
