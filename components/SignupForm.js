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
import { TiTick } from "react-icons/ti";
import { TbDots } from "react-icons/tb";
// App Context
import { AppContext } from "../context/AppContext";
// services
import { getAllGames } from "../Services/Games";
import { createUser, updateUser } from "../Services/User";
// swr
import useSWR from "swr";
// helper
import ShowToast from "helper/ShowToast";

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

const SignupForm = ({ data }) => {
  const router = useRouter();
  const { setLoggedIn } = useContext(AppContext);
  const { data: games, error } = useSWR("GETALLGAMES", getAllGames);

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [isPassValid, setIsPassValid] = useState(null);
  const [selectedStake, setSelectedStake] = useState(
    data?.is_participant && data?.is_organiser
      ? stakeholder[2]
      : data?.is_participant
      ? stakeholder[1]
      : stakeholder[0]
  );
  const [genderSelection, setGenderSelection] = useState(
    data?.gender == "female"
      ? gender[1]
      : data?.gender == "other"
      ? gender[2]
      : gender[0]
  );
  const [profileImg, setProfileImg] = useState(data?.profile_pic || null);
  const [showPass, setShowPass] = useState(false);
  const [gamesSelected, setGamesSelected] = useState(data?.sports || []);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    name: data?.name || "",
    email: data?.email || "",
    password: "",
    contact: data?.contact || "",
    dob: (data && new Date(data?.dob).toISOString().split("T")[0]) || "",
  });

  const handleSelection = (name) => {
    if (gamesSelected.includes(name)) {
      setGamesSelected((prevState) => prevState.filter((e) => e != name));
    } else {
      setGamesSelected((prevState) => [...prevState, name]);
    }
  };

  const profileRef = useRef();
  const addProfile = (e) => {
    const selectedfile = e.target.files;
    if (selectedfile.length > 0) {
      const [imageFile] = selectedfile;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const srcData = fileReader.result;
        setProfileImg(srcData);
      };
      if (imageFile.size < 500001) {
        fileReader.readAsDataURL(imageFile);
      } else {
        ShowToast(false, "File Size Exceded!");
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isPassValid == false || null) {
      ShowToast(false, "Password Incorrect!");
      return;
    }
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

    let json = await createUser(data);
    if (json.error) {
      ShowToast(false, json.error);
    } else {
      ShowToast(true, json.success);
      setIsVerification(true);
    }
    setIsSubmitting(false);
  };

  const handleOtpSubmit = async (e, is_wrong = false) => {
    e.preventDefault();
    setIsSubmitting(true);

    let data = {
      email: formData.email,
      otp: Number(otp),
      sendMail: false,
    };

    if (is_wrong) {
      data = {
        email: formData.email,
        otp: Number(-1),
        sendMail: false,
      };
    }

    let json = await createUser(data);
    if (json.error) {
      ShowToast(false, json.error);
      router.reload();
    } else {
      localStorage.setItem("auth-token", JSON.stringify(json.authToken));
      ShowToast(true, json.success);
      router.push("/profile");
      setLoggedIn(true);
    }
    setIsSubmitting(false);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const apidata = {
      name: formData.name,
      contact: formData.contact,
      dob: formData.dob,
      gender: genderSelection.value,
      sports: gamesSelected,
      is_organiser:
        selectedStake.value == "organiser" || selectedStake.value == "both",
      is_participant:
        selectedStake.value == "participant" || selectedStake.value == "both",
      profile_pic: profileImg,
    };

    let json = await updateUser(apidata);
    if (json.error) {
      ShowToast(false, json.error);
    } else {
      ShowToast(true, json.success);
      router.push("/profile");
    }
    setIsSubmitting(false);
  };

  const updatingPassValue = (e) => {
    setFormData({ ...formData, password: e.target.value });
    if (
      e.target.value.toLowerCase().match("^(?=.*[a-zA-Z])(?=.*[0-9])") &&
      e.target.value.length >= 6
    ) {
      setIsPassValid(true);
    } else {
      setIsPassValid(false);
    }
  };

  const inputStyle =
    "outline-none px-4 py-3 shadow bg-white rounded-2xl w-full text-gray-600 mt-4";

  return (
    <>
      {!isVerification && (
        <form
          onSubmit={data ? handleProfileUpdate : handleFormSubmit}
          className="w-full lg:w-1/2"
        >
          {/* Profile Image */}
          <div
            onClick={() => profileRef.current.click()}
            className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] overflow-hidden mx-auto my-8 cursor-pointer flex flex-col items-center justify-center rounded-full bg-gray-100 shadow"
          >
            {!profileImg ? (
              <>
                {" "}
                <ImageIcon className="text-5xl text-green-400" />
                <span className="text-gray-500 my-2">
                  Upload Your Profile (500KB)
                </span>
              </>
            ) : (
              <img src={profileImg} alt="" />
            )}
            <input
              type="file"
              accept="image/*"
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
            disabled={data && true}
            className={inputStyle}
          />

          {/* Password */}
          {!data && (
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className={inputStyle}
                required={true}
                value={formData.password}
                minLength={6}
                onChange={(e) => updatingPassValue(e)}
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
              <div className="mt-2 mx-2 flex items-center">
                {isPassValid == true && (
                  <TiTick className="text-xl text-green-300" />
                )}
                {isPassValid == false && (
                  <TbDots className="text-xl text-red-300" />
                )}
                <p className="ml-2 text-gray-400 text-sm">
                  Password must contain minimum 6 <b>alpha-numeric</b> letters
                </p>
              </div>
            </div>
          )}

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
              {games?.map((game, index) => (
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
              {!games && <>Loading...</>}
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
            {data ? "Update Profile" : "Sign Up"}
          </button>
        </form>
      )}
      {isVerification && (
        <>
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
            <div className="mt-4 flex items-center">
              <p className="mx-2 text-gray-400">
                Enter the otp sent to{" "}
                <span className="font-semibold tracking-wide">
                  {formData.email}
                </span>
                !
              </p>
              <button
                onClick={(e) => handleOtpSubmit(e, true)}
                type="button"
                className="m-2 text-sm text-cyan-500 font-semibold underline"
              >
                Wrong Email ?
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="my-4 px-4 py-2 w-1/2 md:w-1/3 block ml-auto hover:bg-yellow-200 rounded-2xl bg-white shadow-md text-gray-500 font-sans font-semibold"
            >
              {isSubmitting && <SpinnerIcon />}
              Verify
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default SignupForm;
