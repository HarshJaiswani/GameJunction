import React from "react";
// Next Components
import Link from "next/link";
// Custom Components
import Header from "../components/Header";
import About from "../components/About";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <About />
      <div className="w-[90%] mb-16 p-12 flex items-center justify-between mx-auto rounded-2xl shadow bg-gradient-to-r from-[#091921] to-cyan-500">
        <div>
          <h2 className="text-3xl text-[white]">
            Have a unique game in mind ?
          </h2>
          <p className="my-2 text-xl text-white">
            Suggest us to add it in our list !
          </p>
        </div>
        <Link href="/suggest-game">
          <button className="px-6 py-2 rounded-full bg-white hover:bg-yellow-300 shadow text-gray-500 font-semibold">
            Suggest Game
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
