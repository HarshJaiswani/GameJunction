import React, { Fragment, useState, useRef, useEffect } from "react";
// Next Components
import { useRouter } from "next/router";
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
import { FaTelegramPlane } from "react-icons/fa";
import ImageIcon from "./Icons/ImageIcon";
import SpinnerIcon from "./SpinnerIcon";
// toast
import { toast } from "react-toastify";
// services
import { getAllGames } from "../Services/Games";
import { createEvent, updateEvent } from "../Services/Events";
// swr
import useSWR from "swr";
// hooks
import useUser from "../hooks/useUser";

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

const CreateEventForm = ({ data: event }) => {
  const gameinputref = useRef();
  const router = useRouter();
  const { user } = useUser();
  const { data: sportsData, error } = useSWR("GETALLGAMES", getAllGames);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modeSelect, setModeSelect] = useState(
    event?.mode == "offline" ? modes[1] : modes[0]
  );
  const [categorySelect, setCategorySelect] = useState(
    event?.category == "esport" ? category[1] : category[0]
  );
  const [posterImg, setPosterImg] = useState(event?.poster || null);
  const [isTeamSelect, setIsTeamSelect] = useState(
    event?.maxTeam > 1 ? isTeam[0] : isTeam[1]
  );
  const [formData, setFormData] = useState({
    title: event?.title || "",
    theme: event?.theme || "",
    details: event?.details || "",
    platform: event?.platform || "",
    link: event?.link || "",
    location: event?.location || "",
    minTeam: event?.minTeam || 1,
    maxTeam: event?.maxTeam || 1,
    eventDate:
      (event &&
        new Date(event?.eventDate)
          .toISOString()
          .replace(/(?:\.\d{1,3})?Z$/, "")) ||
      "",
    rewards: event?.rewards || "",
    eligibility: event?.eligibility || "",
    registrationFee: event?.registrationFee || 0,
    lastDateOfRegistration:
      (event &&
        new Date(event?.lastDateOfRegistration)
          .toISOString()
          .replace(/(?:\.\d{1,3})?Z$/, "")) ||
      "",
    contact: event?.contact || "",
    email: event?.email || "",
    website: event?.website || "",
    linkedin: event?.linkedin || "",
    instagram: event?.instagram || "",
    youtube: event?.youtube || "",
    telegram: event?.telegram || "",
    discord: event?.discord || "",
    twitter: event?.twitter || "",
    other: event?.other || "",
  });
  const [sports, setSports] = useState([]);
  const [esports, setEsports] = useState([]);
  const [gameSelect, setGameSelect] = useState(
    event?.sport
      ? { name: event.sport }
      : categorySelect.value == "sport"
      ? sports
      : esports
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
    if (!event && gameinputref.current) {
      gameinputref.current.value = "";
    }
    if (sportsData) {
      let sports = [];
      let esports = [];
      sportsData.forEach((s) => {
        if (s.playable == "offline") {
          sports.push(s);
        } else {
          esports.push(s);
        }
      });
      setSports(sports);
      setEsports(esports);
    }
  }, [categorySelect, sportsData]);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      poster: posterImg,
      title: formData.title,
      theme: formData.theme,
      details: formData.details,
      category: categorySelect.value,
      sport: gameSelect.name,
      mode: modeSelect.value,
      platform: formData.platform,
      link: formData.link,
      location: formData.location,
      minTeam: formData.minTeam,
      maxTeam: formData.maxTeam,
      eventDate: formData.eventDate,
      rewards: formData.rewards,
      eligibility: formData.eligibility,
      registrationFee: formData.registrationFee,
      lastDateOfRegistration: formData.lastDateOfRegistration,
      contact: formData.contact,
      email: formData.email,
      website: formData.website,
      linkedin: formData.linkedin,
      instagram: formData.instagram,
      youtube: formData.youtube,
      telegram: formData.telegram,
      discord: formData.discord,
      twitter: formData.twitter,
      other: formData.other,
    };

    const json = await createEvent(data);
    if (json.error) {
      toast.error(`${json.error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.success(`Event Created!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/list");
    }
    setIsSubmitting(false);
  };

  const posterRef = useRef();
  const addPoster = (e) => {
    const selectedfile = e.target.files;
    if (selectedfile.length > 0) {
      const [imageFile] = selectedfile;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const srcData = fileReader.result;
        setPosterImg(srcData);
      };
      if (imageFile.size < 500001) {
        fileReader.readAsDataURL(imageFile);
      } else {
        toast.error(`File Size Exceded!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      _id: event._id,
      poster: posterImg,
      title: formData.title,
      theme: formData.theme,
      details: formData.details,
      category: categorySelect.value,
      sport: gameSelect.name,
      mode: modeSelect.value,
      platform: formData.platform,
      link: formData.link,
      location: formData.location,
      minTeam: formData.minTeam,
      maxTeam: formData.maxTeam,
      eventDate: formData.eventDate,
      rewards: formData.rewards,
      eligibility: formData.eligibility,
      registrationFee: formData.registrationFee,
      lastDateOfRegistration: formData.lastDateOfRegistration,
      contact: formData.contact,
      email: formData.email,
      website: formData.website,
      linkedin: formData.linkedin,
      instagram: formData.instagram,
      youtube: formData.youtube,
      telegram: formData.telegram,
      discord: formData.discord,
      twitter: formData.twitter,
      other: formData.other,
    };

    let json = await updateEvent(data);
    if (json.error) {
      toast.error(`${json.error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.success(`Event Updated!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/list");
    }
    setIsSubmitting(false);
  };

  const inputStyle =
    "outline-none px-4 py-3 shadow bg-white rounded-2xl w-full text-gray-600 mt-4";

  return (
    <>
      {user ? (
        <form
          onSubmit={event ? handleUpdateEvent : handleCreateEvent}
          className="w-[90%] md:w-[75%] lg:w-2/3 mx-auto"
        >
          {/* Poster */}
          <div
            onClick={() => posterRef.current.click()}
            className="w-full h-[300px] mx-auto overflow-hidden my-8 cursor-pointer flex flex-col items-center justify-center rounded-2xl bg-gray-100 shadow"
          >
            {!posterImg ? (
              <>
                <ImageIcon className="text-5xl text-green-400" />
                <span className="text-gray-500 my-2">
                  Upload Event Poster (500KB)
                </span>
              </>
            ) : (
              <img src={posterImg} alt="" />
            )}
            <input
              type="file"
              accept="image/*"
              ref={posterRef}
              onChange={addPoster}
              className="hidden"
            />
          </div>

          {/* Title */}
          <input
            type="text"
            required={true}
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Give your event a catchy title"
            className={inputStyle}
          />

          {/* Theme */}
          <input
            name="theme"
            id="theme"
            value={formData.theme}
            onChange={(e) =>
              setFormData({ ...formData, theme: e.target.value })
            }
            placeholder="Any Specific theme for the event ?"
            className={`${inputStyle} resize-none`}
          />

          {/* Description */}
          <textarea
            name="longDescp"
            id="longDescp"
            required={true}
            value={formData.details}
            onChange={(e) =>
              setFormData({ ...formData, details: e.target.value })
            }
            placeholder="Describe all the details of the event in detail"
            className={`${inputStyle} resize-none min-h-[200px]`}
          />

          {/* Category */}
          <div
            className={`${inputStyle} flex items-center justify-between flex-wrap`}
          >
            <h2 className="my-4 font-sans text-gray-500">
              Select the category of the event :
            </h2>
            <RadioGroup value={categorySelect} onChange={setCategorySelect}>
              <div className="flex items-center justify-center flex-wrap">
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
                    relative flex cursor-pointer rounded-full my-2 mx-4 px-12 py-2 shadow-md focus:outline-none`
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

          {/* Sport */}
          <div>
            <Combobox value={gameSelect} onChange={setGameSelect}>
              <div className={`relative mt-1 ${inputStyle}`}>
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left sm:text-sm">
                  <Combobox.Input
                    className="w-full outline-none border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                    displayValue={(game) => game?.name}
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
                  <Combobox.Options className="absolute w-[90%] z-[5] mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredGames.length === 0 && query !== "" ? (
                      <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                        Nothing found.
                      </div>
                    ) : (
                      filteredGames.map((game) => (
                        <Combobox.Option
                          key={game._id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-teal-600 text-white"
                                : "text-gray-900"
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

          {/* Mode */}
          <div
            className={`${inputStyle} flex items-center justify-between flex-wrap`}
          >
            <h2 className="my-4 font-sans text-gray-500">
              Select the mode of the event :
            </h2>
            <RadioGroup value={modeSelect} onChange={setModeSelect}>
              <div className="flex items-center justify-center flex-wrap">
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
                    relative flex cursor-pointer rounded-full mx-4 my-2 px-12 py-2 shadow-md focus:outline-none`
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
          {/* Platform & Location */}
          <div>
            {modeSelect.value == "online" && (
              <>
                <input
                  type="text"
                  value={formData.platform}
                  onChange={(e) =>
                    setFormData({ ...formData, platform: e.target.value })
                  }
                  placeholder="Specify the platform"
                  className={`${inputStyle} mt-1`}
                />
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  placeholder="Enter the link to event"
                  className={`${inputStyle} mt-1`}
                />
              </>
            )}
            {modeSelect.value == "offline" && (
              <>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Specify the location"
                  className={`${inputStyle} mt-1`}
                />
              </>
            )}
          </div>

          {/* Team Size */}
          <div
            className={`${inputStyle} flex items-center justify-between flex-wrap`}
          >
            <h2 className="my-4 font-sans text-gray-500">
              Participation will be of :
            </h2>
            <RadioGroup value={isTeamSelect} onChange={setIsTeamSelect}>
              <div className="flex items-center justify-center flex-wrap">
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
                    relative flex cursor-pointer rounded-full mx-4 my-2 px-12 py-2 shadow-md focus:outline-none`
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
              <div className="flex items-center justify-between flex-wrap">
                <h2>Size of the team :</h2>
                <div className="flex items-center flex-wrap justify-center my-2">
                  <input
                    type="number"
                    min={1}
                    value={formData.minTeam}
                    onChange={(e) =>
                      setFormData({ ...formData, minTeam: e.target.value })
                    }
                    placeholder="Minimum"
                    className={`${inputStyle} w-fit mx-2 mt-0 my-2 py-1 border shadow-none`}
                  />
                  <input
                    type="number"
                    min={1}
                    value={formData.maxTeam}
                    onChange={(e) =>
                      setFormData({ ...formData, maxTeam: e.target.value })
                    }
                    placeholder="Maximum"
                    className={`${inputStyle} w-fit mx-2 mt-0 my-2 py-1 border shadow-none`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Date of event */}
          <div
            className={`${inputStyle} flex items-center justify-between flex-wrap`}
          >
            <h2 className="text-gray-500">Select the date of the event: </h2>
            <input
              type="datetime-local"
              required={true}
              value={formData.eventDate}
              onChange={(e) =>
                setFormData({ ...formData, eventDate: e.target.value })
              }
              className="outline-none text-cyan-400 my-2"
            />
          </div>

          {/* Timing of event */}
          {/* <div
            className={`${inputStyle} flex items-center justify-between flex-wrap`}
          >
            <h2 className="text-gray-500">Select the timing of the event: </h2>
            <input
              type="time"
              required={true}
              value={formData.eventTime}
              onChange={(e) =>
                setFormData({ ...formData, eventTime: e.target.value })
              }
              className="outline-none text-cyan-400 my-2"
            />
          </div> */}

          {/* Rewards */}
          <textarea
            name="rewards"
            id="rewards"
            value={formData.rewards}
            onChange={(e) =>
              setFormData({ ...formData, rewards: e.target.value })
            }
            className={`${inputStyle} resize-none min-h-[200px]`}
            placeholder="Details of rewards you are offering"
          />

          {/* Eligibility */}
          <textarea
            name="eligibility"
            id="eligibility"
            value={formData.eligibility}
            onChange={(e) =>
              setFormData({ ...formData, eligibility: e.target.value })
            }
            className={`${inputStyle} resize-none min-h-[200px]`}
            placeholder="Details of eligibility to participate"
          />

          {/* Registration Fee */}
          <div className={`${inputStyle} flex items-center`}>
            <div className="border-r-2">
              <HiOutlineCurrencyRupee className="text-xl text-green-300 mr-4" />
            </div>
            <input
              type="number"
              min={0}
              value={formData.registrationFee}
              onChange={(e) =>
                setFormData({ ...formData, registrationFee: e.target.value })
              }
              className="outline-none w-full px-4"
              placeholder="Registration Fee (if any)"
            />
          </div>

          {/* Last Date for Reg. */}
          <div
            className={`${inputStyle} flex items-center justify-between flex-wrap`}
          >
            <h2 className="text-gray-500">Last date of registration: </h2>
            <input
              type="datetime-local"
              required={true}
              value={formData.lastDateOfRegistration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lastDateOfRegistration: e.target.value,
                })
              }
              className="outline-none text-cyan-400 my-2"
            />
          </div>

          {/* Last Time for Reg. */}
          {/* <div
            className={`${inputStyle} flex items-center justify-between flex-wrap`}
          >
            <h2 className="text-gray-500">Registration closes at: </h2>
            <input
              type="time"
              required={true}
              value={formData.lastTimeOfRegistration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lastTimeOfRegistration: e.target.value,
                })
              }
              className="outline-none text-cyan-400 my-2"
            />
          </div> */}

          {/* Communication Platforms */}
          <div
            className={`${inputStyle} flex flex-col items-start justify-between`}
          >
            <h2 className="text-gray-500">
              Official Communication Platforms:{" "}
            </h2>
            <div className={`flex items-center ${inputStyle}`}>
              <div className="border-r-2">
                <BsTelephone className="text-xl text-green-300 mr-4" />
              </div>
              <input
                type="number"
                min={0}
                max={10000000000}
                value={formData.contact}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
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
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
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
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
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
                value={formData.youtube}
                onChange={(e) =>
                  setFormData({ ...formData, youtube: e.target.value })
                }
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
                value={formData.linkedin}
                onChange={(e) =>
                  setFormData({ ...formData, linkedin: e.target.value })
                }
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
                value={formData.instagram}
                onChange={(e) =>
                  setFormData({ ...formData, instagram: e.target.value })
                }
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
                value={formData.discord}
                onChange={(e) =>
                  setFormData({ ...formData, discord: e.target.value })
                }
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
                value={formData.telegram}
                onChange={(e) =>
                  setFormData({ ...formData, telegram: e.target.value })
                }
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
                value={formData.twitter}
                onChange={(e) =>
                  setFormData({ ...formData, twitter: e.target.value })
                }
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
                value={formData.other}
                onChange={(e) =>
                  setFormData({ ...formData, other: e.target.value })
                }
                className="outline-none w-full px-4"
                placeholder="Any other official link"
              />
            </div>
          </div>

          <button
            type="submit"
            className="my-4 px-4 py-2 w-1/2 lg:w-1/3 block ml-auto hover:bg-yellow-200 rounded-2xl bg-white shadow-md text-gray-500 font-sans font-semibold"
          >
            {isSubmitting && <SpinnerIcon />}
            {event ? "Update Event" : "Create Event"}
          </button>
        </form>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <Link
            href="/signin"
            className="px-6 py-2 rounded-md bg-gray-100 shadow text-gray-500"
          >
            Sign In Required!
          </Link>
        </div>
      )}
    </>
  );
};

export default CreateEventForm;
