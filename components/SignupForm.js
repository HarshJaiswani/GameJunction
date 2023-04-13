import React, { useState, useRef, useEffect, useContext } from "react";
// Next Components
import Link from "next/link";
import { useRouter } from "next/router";
// Headless Ui
import { RadioGroup } from "@headlessui/react";
// Custom Components
// Icons
import CheckIcon from "./Icons/CheckIcon";
import ImageIcon from "./Icons/ImageIcon";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import SpinnerIcon from "./SpinnerIcon";
// App Context
import { AppContext } from "../context/AppContext";

const stakeholder = [
  {
    name: "Event Organiser",
    value: "organiser",
  },
  {
    name: "Participant",
    value: "participant",
  },
  {
    name: "Both",
    value: "both",
  },
];
const gender = [
  {
    name: "Male",
    value: "male",
  },
  {
    name: "Female",
    value: "female",
  },
  {
    name: "Other",
    value: "other",
  },
];

const SignupForm = () => {
  const router = useRouter();
  const { setLoggedIn } = useContext(AppContext);
  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [selectedStake, setSelectedStake] = useState(stakeholder[0]);
  const [genderSelection, setGenderSelection] = useState(gender[0]);
  const [profileImg, setProfileImg] = useState();
  const [showPass, setShowPass] = useState(false);
  const [games, setGames] = useState([]);
  const [gamesSelected, setGamesSelected] = useState([]);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    dob: "",
  });

  const inputStyle =
    "outline-none px-4 py-3 shadow bg-white rounded-2xl w-full text-gray-600 mt-4";

  const handleSelection = (name) => {
    if (gamesSelected.includes(name)) {
      setGamesSelected((prevState) => prevState.filter((e) => e != name));
    } else {
      setGamesSelected((prevState) => [...prevState, name]);
    }
  };

  const profileRef = useRef();
  const addProfile = (e) => {
    // if (e.target.files && e.target.files[0]) {
    //   console.log(e.target.files);
    //   let img = URL.createObjectURL(e.target.files[0]);
    //   console.log(e.target.files[0].toDataURL());
    //   setProfileImg(img);
    // }
    const selectedfile = e.target.files;
    if (selectedfile.length > 0) {
      const [imageFile] = selectedfile;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const srcData = fileReader.result;
        setProfileImg(srcData);
      };
      fileReader.readAsDataURL(imageFile);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const response = await fetch("/api/sport");
    const json = await response.json();
    setGames(json.sports);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      contact: formData.contact,
      dob: formData.dob,
      gender: genderSelection.value,
      sports: gamesSelected,
      is_organiser:
        selectedStake.value == "organiser" || selectedStake.value == "both",
      is_participant:
        selectedStake.value == "participant" || selectedStake.value == "both",
      profile_pic: profileImg,
      sendMail: true,
    };
    const reponse = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await reponse.json();
    setIsVerification(true);
    setIsSubmitting(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = {
      email: formData.email,
      otp: Number(otp),
      sendMail: false,
    };
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json.error) {
      alert("Some Error Occured!");
      router.reload();
    } else {
      localStorage.setItem("auth-token", JSON.stringify(json.authToken));
      router.push("/profile");
      setLoggedIn(true);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      {!isVerification && (
        <form onSubmit={handleFormSubmit} className="w-full lg:w-1/2">
          {/* Profile Image */}
          <div
            onClick={() => profileRef.current.click()}
            className="w-[300px] h-[300px] overflow-hidden mx-auto my-8 cursor-pointer flex flex-col items-center justify-center rounded-full bg-gray-100 shadow"
          >
            {!profileImg ? (
              <>
                {" "}
                <ImageIcon className="text-5xl text-green-400" />
                <span className="text-gray-500 my-2">
                  Upload Your Profile (300 x 300)
                </span>
              </>
            ) : (
              <img src={profileImg} alt="" />
            )}
            <input
              type="file"
              ref={profileRef}
              onChange={addProfile}
              className="hidden"
            />
          </div>

          {/* Name */}
          <input
            type="text"
            required={true}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
            className={inputStyle}
          />

          {/* Email */}
          <input
            type="email"
            required={true}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Email"
            className={inputStyle}
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className={inputStyle}
              required={true}
              value={formData.password}
              minLength={6}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
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

          {/* Contact */}
          <div className={`${inputStyle} flex items-center`}>
            <div className="pr-4 border-r-2 w-fit text-gray-400 font-semibold">
              +91
            </div>
            <input
              type="number"
              placeholder="Contact Number"
              min={0}
              required={true}
              max={10000000000}
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              className="px-4 outline-none w-full"
            />
          </div>

          {/* DOB */}
          <div
            className={`${inputStyle} flex items-center justify-between flex-wrap`}
          >
            <h2 className="text-gray-400">Enter your date of birth</h2>
            <input
              type="date"
              required={true}
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
              className="outline-none text-cyan-500 my-2"
            />
          </div>

          {/* Stake */}
          <div className={`mt-4 sm:flex items-center ${inputStyle}`}>
            <span className="mb-4 w-full sm:w-1/3 inline-block text-gray-400">
              Want to be a :{" "}
            </span>
            <div className="w-2/3 sm:mx-8">
              <RadioGroup value={selectedStake} onChange={setSelectedStake}>
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

          {/* Gender */}
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

          {/* Sport */}
          <div className={`mt-4 ${inputStyle}`}>
            <span className="mb-4 w-full inline-block text-gray-400">
              In what category do you want to play/organise :{" "}
            </span>
            <div>
              {games.map((game, index) => (
                <div
                  key={index}
                  className={`flex my-2 w-full relative cursor-pointer rounded-lg p-2 focus:outline-none items-center justify-between border ${
                    gamesSelected.includes(game.name)
                      ? "bg-gray-500 ring-2 ring-sky-200"
                      : "bg-white"
                  }`}
                  onClick={() => handleSelection(game.name)}
                >
                  <div className="flex items-center">
                    <div className="text-sm flex items-center">
                      <div
                        className={`font-sans font-semibold tracking-wider ${
                          gamesSelected.includes(game.name)
                            ? "text-white"
                            : "text-gray-500"
                        }`}
                      >
                        {game.name}
                      </div>
                      <span
                        className={`py-1 px-2 text-xs mx-4 rounded-md ${
                          gamesSelected.includes(game.name)
                            ? "bg-gray-300/20 text-white"
                            : "bg-yellow-400 text-black"
                        }`}
                      >
                        {game.playable}
                      </span>
                    </div>
                  </div>
                  {gamesSelected.includes(game.name) && (
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="my-4 px-4 py-2 w-1/2 md:w-1/3 block ml-auto hover:bg-yellow-200 rounded-2xl bg-white shadow-md text-gray-500 font-sans font-semibold"
          >
            {isSubmitting && <SpinnerIcon />}
            Sign Up
          </button>
        </form>
      )}
      {isVerification && (
        <form onSubmit={handleOtpSubmit} className="w-full lg:w-1/2">
          <input
            type="number"
            min={1000}
            max={9999}
            className={inputStyle}
            placeholder="Enter Otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <p className="mt-4 mx-2 text-gray-400 font-semibold">
            Enter the otp sent to your mail!
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="my-4 px-4 py-2 w-1/2 md:w-1/3 block ml-auto hover:bg-yellow-200 rounded-2xl bg-white shadow-md text-gray-500 font-sans font-semibold"
          >
            {isSubmitting && <SpinnerIcon />}
            Verify
          </button>
        </form>
      )}
    </>
  );
};

export default SignupForm;
