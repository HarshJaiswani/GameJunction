import React from "react";
// Next Components
import Link from "next/link";
// Custom Components
import Navbar from "../Navbar";
import Footer from "../Footer";
import DataTable from "./DataTable";
import PieChart from "../Chart/PieChart";

const data = [
  {
    name: "All Organisers",
    value: "all_organisers",
    digit: 86,
  },
  {
    name: "All Participants",
    value: "all_participants",
    digit: 41,
  },
  {
    name: "All Games",
    value: "all_games",
    digit: 69,
  },
  {
    name: "All Enquires",
    value: "all_enquires",
    digit: 36,
  },
];

const AppAdmin = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 w-full min-h-screen p-8 sm:p-12">
        {/* <div className="w-1/2">
          <PieChart />
        </div> */}
        <div className="flex items-center justify-evenly flex-wrap">
          {data.map((item, index) => (
            <Link
              href={`#${item.value}`}
              key={index}
              className="bg-white hover:bg-green-50 cursor-pointer w-[200px] h-[100px] m-4 rounded-2xl shadow flex items-center justify-center flex-col"
            >
              <p className="text-2xl font-semibold text-green-400">
                {item.digit}
              </p>
              <p className="text-gray-400">{item.name}</p>
            </Link>
          ))}
        </div>
        <h2
          id="all_organisers"
          className="text-xl sm:text-2xl md:text-3xl mt-8 text-gray-600 font-semibold my-4"
        >
          All Organisers
        </h2>
        <DataTable />
        <h2
          id="all_participants"
          className="text-xl sm:text-2xl md:text-3xl mt-8 text-gray-600 font-semibold my-4"
        >
          All Participants
        </h2>
        <DataTable />
        <h2
          id="all_games"
          className="text-xl sm:text-2xl md:text-3xl mt-8 text-gray-600 font-semibold my-4"
        >
          All Games
        </h2>
        <DataTable />
        <h2
          id="all_enquires"
          className="text-xl sm:text-2xl md:text-3xl mt-8 text-gray-600 font-semibold my-4"
        >
          All Enquires
        </h2>
        <DataTable />
      </div>
      <Footer />
    </>
  );
};

export default AppAdmin;
