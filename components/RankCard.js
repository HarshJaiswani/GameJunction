import React from "react";

const RankCard = ({ user, type, theme }) => {
  return (
    <li className="w-full flex items-center justify-center">
      <div className="px-4 py-2 font-semibold text-gray-400 text-lg bg-gray-200/50 rounded-tl-lg rounded-bl-lg">
        <span className="icon-font text-gray-400 text-xl font-semibold">#</span>
        <span>
          {type.toLowerCase() == "organiser"
            ? user.organiser_rank
            : user.participant_rank}
        </span>
      </div>
      <div
        className={`w-full my-4 p-4 flex items-center justify-between cursor-pointer rounded-2xl shadow ${
          theme == "dark" ? "bg-cyan-800 text-white" : "bg-white"
        }`}
      >
        <div className="flex items-center">
          <div className="rounded-full p-1 mr-4 w-10 h-10 bg-gray-200"></div>
          <h3 className="text-lg font-semibold font-sans nunito-font">
            {user.name.toUpperCase()}
          </h3>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-yellow-200 mx-2 flex items-center justify-center font-semibold text-gray-500">
            {user.events_oraganised}
          </div>
          <div className="w-10 h-10 rounded-full bg-teal-200 mx-2 flex items-center justify-center font-semibold text-gray-500">
            {user.overall_ranking}
          </div>
        </div>
      </div>
    </li>
  );
};

export default RankCard;
