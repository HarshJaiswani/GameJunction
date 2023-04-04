import React from "react";

const SuggestGame = () => {
  const inputStyle =
    "outline-none px-4 py-3 shadow bg-white rounded-2xl w-full text-gray-600 mt-4";
  return (
    <div className="py-4 min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-1/2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-yellow-400">
          Have a unique game in mind ?
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl font-semibold my-4 text-center text-gray-500">
          Suggest it here !
        </p>
        <form>
          <input
            type="text"
            placeholder="Specify Game Name"
            className={inputStyle}
          />
          <input
            type="text"
            placeholder="Add a link having details of this game and its rules"
            className={inputStyle}
          />
          <button className="my-4 px-4 py-2 w-1/2 lg:w-1/3 block ml-auto hover:bg-yellow-200 rounded-2xl bg-white shadow-md text-gray-500 font-sans font-semibold">
            Add Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuggestGame;
