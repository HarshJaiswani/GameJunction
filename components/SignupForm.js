import React, { useState, useRef } from "react";
// Next Components
import Link from "next/link";
// Headless Ui
import { RadioGroup } from "@headlessui/react";
// Icons
import CheckIcon from "./Icons/CheckIcon";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CiImageOn } from "react-icons/ci";

const stakeholder = [
  {
    name: "Event Organiser",
  },
  {
    name: "Participant",
  },
  {
    name: "Both",
  },
];
const gender = [
  {
    name: "Male",
  },
  {
    name: "Female",
  },
  {
    name: "Other",
  },
];

// this will be replaced with the games list
const gameList = [
  { id: 1, name: "Cricket", mode: "PSport", checked: false },
  { id: 2, name: "PubG", mode: "Esport", checked: false },
  { id: 3, name: "Hockey", mode: "Psport", checked: false },
  { id: 4, name: "Badminton", mode: "Psport", checked: true },
  { id: 5, name: "FreeFire", mode: "Esport", checked: false },
];

// add age gender and profile pic or avtar option here

const SignupForm = () => {
  const [selected, setSelected] = useState(stakeholder[0]);
  const [genderSelection, setGenderSelection] = useState(gender[0]);
  const [profileImg, setProfileImg] = useState();
  const [showPass, setShowPass] = useState(true);
  const inputStyle =
    "outline-none px-4 py-3 shadow bg-white rounded-2xl w-full text-gray-600 mt-4";
  const [games, setGames] = useState(gameList);
  const [gamesSelected, setGamesSelected] = useState([]);
  const handleCheckboxChange = (id) => {
    games[id - 1].checked = !games[id - 1].checked;
    setGames(games);
  };
  const profileRef = useRef();
  const handleSelection = (id) => {
    if (gamesSelected.includes(id)) {
      setGamesSelected((prevState) => prevState.filter((e) => e != id));
    } else {
      setGamesSelected((prevState) => [...prevState, id]);
    }
  };
  const addProfile = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = URL.createObjectURL(e.target.files[0]);
      setProfileImg(img);
    }
  };

  return (
    <form className="w-full lg:w-1/2">
      <div
        onClick={() => profileRef.current.click()}
        className="w-[300px] h-[300px] mx-auto my-8 cursor-pointer flex flex-col items-center justify-center rounded-full bg-gray-100 shadow"
      >
        {!profileImg ? (
          <>
            {" "}
            <CiImageOn className="text-5xl text-green-400" />
            <span className="text-gray-500 my-2">
              Upload Your Profile (300 x 300)
            </span>
          </>
        ) : (
          <img src={profileImg} />
        )}
        <input
          type="file"
          ref={profileRef}
          onChange={addProfile}
          className="hidden"
        />
      </div>
      <input type="text" placeholder="Name" className={inputStyle} />
      <input type="email" placeholder="Email" className={inputStyle} />
      <div className="relative">
        <input
          type={showPass ? "text" : "password"}
          placeholder="Password"
          className={inputStyle}
        />
        <div className="absolute top-8 right-3">
          {showPass && (
            <AiOutlineEye
              className="text-lg text-gray-300 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            />
          )}
          {!showPass && (
            <AiOutlineEyeInvisible
              className="text-lg text-gray-300 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            />
          )}
        </div>
      </div>
      <div className={`${inputStyle} flex items-center`}>
        <div className="pr-4 border-r-2 w-fit text-gray-400 font-semibold">
          +91
        </div>
        <input
          type="number"
          placeholder="Contact Number"
          min={0}
          max={10000000000}
          className="px-4 outline-none w-full"
        />
      </div>
      <div
        className={`${inputStyle} flex items-center justify-between flex-wrap`}
      >
        <h2 className="text-gray-400">Enter your date of birth</h2>
        <input type="date" className="outline-none text-cyan-500 my-2" />
      </div>
      <div className={`mt-4 sm:flex items-center ${inputStyle}`}>
        <span className="mb-4 w-full sm:w-1/3 inline-block text-gray-400">
          Want to be a :{" "}
        </span>
        <div className="w-2/3 sm:mx-8">
          <RadioGroup value={selected} onChange={setSelected}>
            <div className="space-y-2">
              {stakeholder.map((stake) => (
                <RadioGroup.Option
                  key={stake.name}
                  value={stake}
                  className={({ active, checked }) =>
                    `
                  ${active ? "ring-2 ring-blue-200" : ""}
                  ${checked ? "bg-gray-500" : "bg-white"}
                    relative flex cursor-pointer rounded-lg border p-2 focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-sans font-semibold tracking-wider ${
                                checked ? "text-white" : "text-gray-500"
                              }`}
                            >
                              {stake.name}
                            </RadioGroup.Label>
                          </div>
                        </div>
                        {checked && (
                          <div className="shrink-0 text-white">
                            <CheckIcon className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className={`mt-4 sm:flex items-center ${inputStyle}`}>
        <span className="mb-4 w-full sm:w-1/3 inline-block text-gray-400">
          Select your gender:
        </span>
        <div className="w-2/3 sm:mx-8">
          <RadioGroup value={genderSelection} onChange={setGenderSelection}>
            <div className="space-y-2">
              {gender.map((stake) => (
                <RadioGroup.Option
                  key={stake.name}
                  value={stake}
                  className={({ active, checked }) =>
                    `
                  ${active ? "ring-2 ring-blue-200" : ""}
                  ${checked ? "bg-gray-500" : "bg-white"}
                    relative flex cursor-pointer rounded-lg border p-2 focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-sans font-semibold tracking-wider ${
                                checked ? "text-white" : "text-gray-500"
                              }`}
                            >
                              {stake.name}
                            </RadioGroup.Label>
                          </div>
                        </div>
                        {checked && (
                          <div className="shrink-0 text-white">
                            <CheckIcon className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className={`mt-4 ${inputStyle}`}>
        <span className="mb-4 w-full inline-block text-gray-400">
          In what category do you want to play/organise :{" "}
        </span>
        <div>
          {games.map((game, index) => (
            <div
              key={index}
              className={`flex my-2 w-full relative cursor-pointer rounded-lg p-2 focus:outline-none items-center justify-between border ${
                gamesSelected.includes(game.id)
                  ? "bg-gray-500 ring-2 ring-sky-200"
                  : "bg-white"
              }`}
              onClick={() => handleSelection(game.id)}
            >
              <div className="flex items-center">
                <div className="text-sm flex items-center">
                  <div
                    className={`font-sans font-semibold tracking-wider ${
                      gamesSelected.includes(game.id)
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                  >
                    {game.name}
                  </div>
                  <span
                    className={`py-1 px-2 text-xs mx-4 rounded-md ${
                      gamesSelected.includes(game.id)
                        ? "bg-gray-300/20 text-white"
                        : "bg-yellow-400 text-black"
                    }`}
                  >
                    {game.mode}
                  </span>
                </div>
              </div>
              {gamesSelected.includes(game.id) && (
                <div className="shrink-0 text-white">
                  <CheckIcon className="h-6 w-6" />
                </div>
              )}
            </div>
          ))}
          <Link
            href="/suggest-game"
            className={`flex my-2 w-full relative cursor-pointer rounded-lg p-2 focus:outline-none items-center justify-between`}
          >
            <div className="flex items-center">
              <div className="text-sm flex items-center">
                <div
                  className={`font-sans font-semibold tracking-wider
                      text-cyan-600
                    `}
                >
                  Do you play a unique game ? (You can suggest one!)
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <button className="my-4 px-4 py-2 w-1/2 md:w-1/3 block ml-auto hover:bg-yellow-200 rounded-2xl bg-white shadow-md text-gray-500 font-sans font-semibold">
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
