import React from "react";
// Custom Components
import Navbar from "../Navbar";
import Footer from "../Footer";
import DataTable from "./DataTable";

const Organiser = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        <div className="w-[95%] lg:w-[80%] mx-auto">
          <div className="py-4 sm:py-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-semibold my-4">
              Current Events
            </h2>
            {/* <DataTable /> */}
          </div>
          <div className="py-4 sm:py-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-semibold my-4">
              Past Events
            </h2>
            {/* <DataTable /> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Organiser;
