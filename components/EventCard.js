import React, { useState } from "react";
// Next Components
import Link from "next/link";
// Icons
import { TiArrowForwardOutline } from "react-icons/ti";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const EventCard = ({ post }) => {
  return (
    <li className="w-full md:w-[45%] my-4 cursor-pointer rounded-2xl ring-2 ring-gray-100 bg-white hover:ring-teal-200">
      <Link href={`/events/${post.id}`}>
        <div className="p-4 flex items-center justify-between">
          <div className="">
            <h3 className="text-lg font-semibold font-sans nunito-font">
              {post.title.toUpperCase()}
            </h3>
            <div className="flex items-center">
              <span className="text-gray-300 mr-2">by</span>
              <span className="text-yellow-400 text-sm font-semibold">
                {post.organiser.toUpperCase()}
              </span>
            </div>
          </div>
          <div
            className="flex items-center"
            onClick={(e) => e.preventDefault()}
          >
            <div className="p-2 rounded-full mx-2 bg-gray-100/60 hover:ring-2 hover:ring-teal-200 shadow w-fit">
              {/* <AiFillHeart className="text-[red] text-2xl" /> */}
              <AiOutlineHeart className="text-[gray] text-2xl" />
            </div>
            <div className="p-2 rounded-full mx-2 bg-gray-100/60 hover:ring-2 hover:ring-teal-200 shadow w-fit">
              <TiArrowForwardOutline className="text-blue-400 text-2xl" />
            </div>
          </div>
        </div>
        <div className="bg-gray-50/50 p-4 flex items-center justify-between flex-wrap">
          {/* {post.shortDescp} */}
          <div className="mr-4">
            <span className="text-gray-300">Theme : </span>
            <div className="px-6 py-2 rounded-full border text-gray-400 w-fit">
              No Restriction
            </div>
          </div>
          <div className="text-gray-400 font-semibold my-4">
            <span className="text-green-500">1000+</span> Participants
          </div>
        </div>
        <div className="sm:mb-4 p-4 flex items-center justify-start flex-wrap">
          <div className="px-4 py-2 rounded-xl bg-gray-100 tracking-wider m-2">
            {post.sport}
          </div>
          <div className="px-4 py-2 rounded-xl bg-gray-100 tracking-wider m-2">
            {post.mode}
          </div>
          <div className="px-4 py-2 rounded-xl bg-gray-100 tracking-wider m-2">
            {post.platform || post.location}
          </div>
        </div>
        <div className="p-4 flex items-center justify-between sm:flex-row flex-col">
          <div className="sm:flex items-start justify-start flex-col">
            <span className="text-gray-500 mr-2">Registration Fee: </span>
            <span className="text-teal-400 font-sans font-semibold">
              Rs. {post.registrationFee || "0"}
            </span>
          </div>
          {post.isActive ? (
            <button className="my-4 sm:my-0 ml-auto hover:bg-blue-400 block w-full sm:w-fit px-4 py-2 sm:py-2.5 rounded-lg bg-blue-500 text-white">
              Apply Now
            </button>
          ) : (
            <button className="ml-auto hover:bg-yellow-400 block px-4 py-2.5 rounded-lg bg-yellow-500 text-white">
              View Details
            </button>
          )}
        </div>
      </Link>
    </li>
  );
};

export default EventCard;
