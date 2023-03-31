import React, { Fragment, useState, useRef, useEffect } from "react";
// Next Components
import Link from "next/link";
// Headless UI
import { Combobox, RadioGroup, Transition } from "@headlessui/react";
// Icons
import CheckIcon from "./Icons/CheckIcon";
import ChevronUpDownIcon from "./Icons/ChevronUpDownIcon";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdAlternateEmail } from "react-icons/md";
import { SlSocialYoutube, SlSocialLinkedin, SlGlobe } from "react-icons/sl";
import { TfiInstagram, TfiTwitter } from "react-icons/tfi";
import { BsTelephone } from "react-icons/bs";
import { MdInsertLink } from "react-icons/md";
import { RxDiscordLogo } from "react-icons/rx";
import { CiImageOn } from "react-icons/ci";
import { FaTelegramPlane } from "react-icons/fa";
/**
 * 
 * const data = Array(5).fill({
    id: 5,
    title: "Event name",
    shortDescp:
      "jkncjsn kcjnjks ncjknsj kncksnc nsnjc ndcdjk ndjwnkdnm ksncjn slndcldn lkwnml cnrh nlmc kammk dcs",
    longDescp:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo vero quia quae dolorem sapiente alias harum consectetur iure adipisci non voluptatibus nulla, inventore, dicta laboriosam. Hic numquam eum accusantium velit asperiores libero voluptate laboriosam, tenetur, aut corrupti voluptatum dolor esse atque eos! Dolorum voluptate eos incidunt exercitationem ad temporibus sint consectetur earum?",
    mode: "online",
    date: "",
    timing: "",
    organiser: "harsh jaiswani",
    type: "psport",
    sport: "Cricket",
    location: null,
    platform: "Dream11",
    price: "price will be displyed here",
    registrationFee: null,
    eligibility: "if any eligibility will be show here",
  });
 */

const modes = [
  {
    name: "Online",
    value: "online",
  },
  {
    name: "Offline",
    value: "offline",
  },
];

const category = [
  {
    name: "Sport",
    value: "sport",
  },
  {
    name: "ESport",
    value: "esport",
  },
];

const isTeam = [
  {
    name: "Team",
    value: "team",
  },
  {
    name: "Individual",
    value: "individual",
  },
];

const sports = [
  {
    id: 1,
    name: "Badminton",
  },
  {
    id: 2,
    name: "Cricket",
  },
  {
    id: 3,
    name: "Football",
  },
  {
    id: 4,
    name: "Hockey",
  },
];

const esports = [
  {
    id: 1,
    name: "PubG",
  },
  {
    id: 2,
    name: "FreeFire",
  },
  {
    id: 3,
    name: "Minimilitia",
  },
];

const CreateEventForm = () => {
  const gameinputref = useRef();
  const [modeSelect, setModeSelect] = useState(modes[0]);
  const [categorySelect, setCategorySelect] = useState(category[0]);
  const [isTeamSelect, setIsTeamSelect] = useState(isTeam[0]);
  const inputStyle =
    "outline-none px-4 py-3 shadow bg-white rounded-2xl w-full text-gray-600 mt-4";
  const [gameSelect, setGameSelect] = useState(
    categorySelect.value == "sport" ? sports : esports
  );
  const [query, setQuery] = useState("");

  const filteredGames =
    query === ""
      ? categorySelect.value == "sport"
        ? sports
        : esports
      : (categorySelect.value == "sport" ? sports : esports).filter((sport) =>
          sport.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  useEffect(() => {
    gameinputref.current.value = "";
  }, [categorySelect]);

  return (
    <form className="w-2/3 mx-auto">
      <div className="w-[300px] h-[300px] mx-auto my-8 cursor-pointer flex flex-col items-center justify-center rounded-2xl bg-gray-100 shadow">
        <CiImageOn className="text-5xl text-green-400" />
        <span className="text-gray-500 my-2">
          Upload Event Poster (300 x 300)
        </span>
      </div>
      <input
        type="text"
        placeholder="Give your event a catchy title"
        className={inputStyle}
      />
      <textarea
        name="shortDescp"
        id="shortDescp"
        placeholder="Add a short & crisp description for the event"
        className={`${inputStyle} resize-none`}
      />
      <textarea
        name="longDescp"
        id="longDescp"
        placeholder="Describe all the details of the event in detail"
        className={`${inputStyle} resize-none min-h-[200px]`}
      />
      <div className={`${inputStyle} flex items-center justify-between`}>
        <h2 className="my-4 font-sans text-gray-500">
          Select the category of the event :
        </h2>
        <RadioGroup value={categorySelect} onChange={setCategorySelect}>
          <div className="flex items-center">
            {category.map((cat) => (
              <RadioGroup.Option
                key={cat.name}
                value={cat}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                  ${
                    checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative flex cursor-pointer rounded-full mx-4 px-12 py-2 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-500"
                            }`}
                          >
                            {cat.name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div>
        <Combobox value={gameSelect} onChange={setGameSelect}>
          <div className={`relative mt-1 ${inputStyle}`}>
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left sm:text-sm">
              <Combobox.Input
                className="w-full outline-none border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                displayValue={(game) => game.name}
                placeholder="Select Game"
                onChange={(event) => setQuery(event.target.value)}
                ref={gameinputref}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute min-w-[50%] w-fit z-[5] mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredGames.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredGames.map((game) => (
                    <Combobox.Option
                      key={game.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-teal-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={game}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {game.name}
                          </span>
                          {selected && (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
                <Combobox.Option className="relative cursor-default select-none py-2 pl-10 pr-4 text-cyan-600">
                  <Link
                    href="/suggest-game"
                    className="block truncate font-normal"
                  >
                    Do you play a unique game ? (You can suggest one!)
                  </Link>
                </Combobox.Option>
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
      <div className={`${inputStyle} flex items-center justify-between`}>
        <h2 className="my-4 font-sans text-gray-500">
          Select the mode of the event :
        </h2>
        <RadioGroup value={modeSelect} onChange={setModeSelect}>
          <div className="flex items-center">
            {modes.map((mode) => (
              <RadioGroup.Option
                key={mode.name}
                value={mode}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                  ${
                    checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative flex cursor-pointer rounded-full mx-4 px-12 py-2 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-500"
                            }`}
                          >
                            {mode.name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div>
        {modeSelect.value == "online" && (
          <>
            <input
              type="text"
              placeholder="Specify the platform"
              className={`${inputStyle} mt-1`}
            />
            <input
              type="text"
              placeholder="Enter the link to event"
              className={`${inputStyle} mt-1`}
            />
          </>
        )}
        {modeSelect.value == "offline" && (
          <>
            <input
              type="text"
              placeholder="Specify the location"
              className={`${inputStyle} mt-1`}
            />
          </>
        )}
      </div>
      <div className={`${inputStyle} flex items-center justify-between`}>
        <h2 className="my-4 font-sans text-gray-500">
          Participation will be of :
        </h2>
        <RadioGroup value={isTeamSelect} onChange={setIsTeamSelect}>
          <div className="flex items-center">
            {isTeam.map((cat) => (
              <RadioGroup.Option
                key={cat.name}
                value={cat}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                  ${
                    checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative flex cursor-pointer rounded-full mx-4 px-12 py-2 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-500"
                            }`}
                          >
                            {cat.name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      {isTeamSelect.value == "team" && (
        <div className={`${inputStyle} mt-1`}>
          <div className="flex items-center justify-between">
            <h2>Size of the team :</h2>
            <input
              type="number"
              min={1}
              placeholder="Minimum"
              className={`${inputStyle} w-[300px] mt-0 shadow-none border`}
            />
            <input
              type="number"
              min={1}
              placeholder="Maximum"
              className={`${inputStyle} w-[300px] mt-0 shadow-none border`}
            />
          </div>
        </div>
      )}
      <div className={`${inputStyle} flex items-center justify-between`}>
        <h2 className="text-gray-500">Select the date of the event: </h2>
        <input type="date" className="outline-none text-cyan-400" />
      </div>
      <div className={`${inputStyle} flex items-center justify-between`}>
        <h2 className="text-gray-500">Select the timing of the event: </h2>
        <input type="time" className="outline-none text-cyan-400" />
      </div>
      <textarea
        name="rewards"
        id="rewards"
        className={`${inputStyle} resize-none min-h-[200px]`}
        placeholder="Details of rewards you are offering"
      />
      <textarea
        name="eligibility"
        id="eligibility"
        className={`${inputStyle} resize-none min-h-[200px]`}
        placeholder="Details of eligibility to participate"
      />
      <div className={`${inputStyle} flex items-center`}>
        <div className="border-r-2">
          <HiOutlineCurrencyRupee className="text-xl text-green-300 mr-4" />
        </div>
        <input
          type="number"
          min={0}
          className="outline-none w-full px-4"
          placeholder="Registration Fee (if any)"
        />
      </div>
      <div className={`${inputStyle} flex items-center justify-between`}>
        <h2 className="text-gray-500">Last date of registration: </h2>
        <input type="date" className="outline-none text-cyan-400" />
      </div>
      <div className={`${inputStyle} flex items-center justify-between`}>
        <h2 className="text-gray-500">Registration closes at: </h2>
        <input type="time" className="outline-none text-cyan-400" />
      </div>
      <div
        className={`${inputStyle} flex flex-col items-start justify-between`}
      >
        <h2 className="text-gray-500">Official Communication Platforms: </h2>
        <div className={`flex items-center ${inputStyle}`}>
          <div className="border-r-2">
            <BsTelephone className="text-xl text-green-300 mr-4" />
          </div>
          <input
            type="number"
            min={0}
            max={10000000000}
            className="outline-none w-full px-4"
            placeholder="Official Contact Number"
          />
        </div>
        <div className={`flex items-center ${inputStyle}`}>
          <div className="border-r-2">
            <MdAlternateEmail className="text-xl text-green-300 mr-4" />
          </div>
          <input
            type="email"
            className="outline-none w-full px-4"
            placeholder="Official Email Address"
          />
        </div>
        <div className={`flex items-center ${inputStyle}`}>
          <div className="border-r-2">
            <SlGlobe className="text-xl text-green-300 mr-4" />
          </div>
          <input
            type="text"
            className="outline-none w-full px-4"
            placeholder="Official Web Address"
          />
        </div>
        <div className={`flex items-center ${inputStyle}`}>
          <div className="border-r-2">
            <SlSocialYoutube className="text-xl text-green-300 mr-4" />
          </div>
          <input
            type="text"
            className="outline-none w-full px-4"
            placeholder="Official Youtube Channel"
          />
        </div>
        <div className={`flex items-center ${inputStyle}`}>
          <div className="border-r-2">
            <SlSocialLinkedin className="text-xl text-green-300 mr-4" />
          </div>
          <input
            type="text"
            className="outline-none w-full px-4"
            placeholder="Official LinkedIn Page"
          />
        </div>
        <div className={`flex items-center ${inputStyle}`}>
          <div className="border-r-2">
            <TfiInstagram className="text-xl text-green-300 mr-4" />
          </div>
          <input
            type="text"
            className="outline-none w-full px-4"
            placeholder="Official Instagram Page"
          />
        </div>
        <div className={`flex items-center ${inputStyle}`}>
          <div className="border-r-2">
            <RxDiscordLogo className="text-xl text-green-300 mr-4" />
          </div>
          <input
            type="text"
            className="outline-none w-full px-4"
            placeholder="Official Discord Channel"
          />
        </div>
        <div className={`flex items-center ${inputStyle}`}>
          <div className="border-r-2">
            <FaTelegramPlane className="text-xl text-green-300 mr-4" />
          </div>
          <input
            type="text"
            className="outline-none w-full px-4"
            placeholder="Official Telegram Channel"
          />
        </div>
        <div className={`flex items-center ${inputStyle}`}>
          <div className="border-r-2">
            <TfiTwitter className="text-xl text-green-300 mr-4" />
          </div>
          <input
            type="text"
            className="outline-none w-full px-4"
            placeholder="Official Twitter Handle"
          />
        </div>
        <div className={`flex items-center ${inputStyle}`}>
          <div className="border-r-2">
            <MdInsertLink className="text-2xl text-green-300 mr-4" />
          </div>
          <input
            type="text"
            className="outline-none w-full px-4"
            placeholder="Any other official link"
          />
        </div>
      </div>
      <button className="my-4 px-4 py-2 w-[300px] block ml-auto hover:bg-yellow-200 rounded-2xl bg-white shadow-md text-gray-500 font-sans font-semibold">
        Create Event
      </button>
    </form>
  );
};

export default CreateEventForm;
