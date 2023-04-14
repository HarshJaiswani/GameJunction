import React, { useContext, useEffect, useState } from "react";
// Next Components
import { useRouter } from "next/router";
import Link from "next/link";
// App Context
import { AppContext } from "../../context/AppContext";
// Icons
import { MdAlternateEmail } from "react-icons/md";
import { SlSocialYoutube, SlSocialLinkedin, SlGlobe } from "react-icons/sl";
import { TfiInstagram, TfiTwitter } from "react-icons/tfi";
import { BsTelephone } from "react-icons/bs";
import { MdInsertLink } from "react-icons/md";
import { RxDiscordLogo } from "react-icons/rx";
import { FaTelegramPlane } from "react-icons/fa";
import ImageIcon from "../../components/Icons/ImageIcon";
import { HiOutlineCurrencyRupee } from "react-icons/hi";

const EventId = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AppContext);
  const [event, setEvent] = useState({});
  useEffect(() => {
    if (router.isReady) {
      fetchEvent();
    }
  }, [router.isReady]);
  const inputStyle =
    "outline-none px-4 py-3 shadow bg-white rounded-2xl w-full text-gray-600 mt-4";
  const handleApplyEvent = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
    } else {
      router.push("/signin");
    }
  };
  const fetchEvent = async () => {
    const response = await fetch("/api/fetchsingleevent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventid: router.query.event_id }),
    });
    const json = await response.json();
    if (json.error) {
      alert("Some Error Occured!");
    } else {
      console.log(json);
      setEvent(json.event);
    }
  };
  return (
    <div className="bg-gray-50 p-5 sm:py-12">
      <div className="w-full lg:w-2/3 mx-auto">
        <h2 className="text-3xl font-semibold text-gray-500 mb-4 text-center">
          {event.title}
        </h2>
        <div className="h-[350px] my-8 mx-auto overflow-hidden cursor-pointer flex flex-col items-center justify-center rounded-2xl bg-gray-100 shadow">
          {event.poster ? (
            <img src={event.poster} alt="" />
          ) : (
            <>
              <ImageIcon className="text-5xl text-green-400" />
              <span className="text-gray-500 my-2">Event&apos;s Poster</span>
            </>
          )}
        </div>
        <div className="p-5 md:p-12 border rounded-2xl bg-white shadow mx-auto mb-8">
          <div className="px-4 border-l-2 mb-8 border-blue-400">
            <h2 className="text-gray-400">Organised from</h2>
            <p className="font-semibold text-gray-500">
              {new Date(event.eventDate).toUTCString()}
            </p>
          </div>
          <div>
            <p className="text-gray-400">Applications Ends at :</p>
            <p className="text-gray-500 font-semibold my-2 sm:text-lg">
              {new Date(event.lastDateOfRegistration).toUTCString()}
            </p>
          </div>
          <button
            onClick={handleApplyEvent}
            className="w-full rounded-lg font-semibold bg-[blue] my-4 text-white shadow py-2"
          >
            Apply Now
          </button>
        </div>
        <div className="my-8 text-gray-400 text-lg">{event.details}</div>
        <div className="p-5 md:p-12 flex flex-wrap items-center border rounded-2xl bg-white shadow mx-auto mb-8">
          <p className="text-gray-400">We will be playing :</p>
          <div className="px-8 py-2 rounded-2xl mx-4 w-fit my-2 bg-gray-100 text-green-400 font-semibold">
            {event.sport}
          </div>
          <p className="text-gray-400">at :</p>
          {event.mode == "online" ? (
            <>
              <div className="px-8 py-2 rounded-2xl w-fit mx-4 my-2 bg-gray-100 text-green-400 font-semibold">
                {event.platform}
              </div>
              <div className="px-8 py-2 rounded-2xl w-fit mx-4 my-2 bg-gray-100 text-green-400 font-semibold">
                <Link href={event.link}>Link to event</Link>
              </div>
            </>
          ) : (
            <div className="px-8 py-2 rounded-2xl w-fit mx-4 my-2 bg-gray-100 text-green-400 font-semibold">
              {event.location}
            </div>
          )}
        </div>
        <div className="p-5 md:p-12 flex flex-wrap items-center justify-between border rounded-2xl bg-gray-100 shadow mx-auto mb-8">
          <div className="w-full sm:w-[45%] shadow bg-white p-4 rounded-md">
            <p className="text-gray-500 text-lg font-semibold mb-4">
              Team Size:{" "}
            </p>
            <span className="text-gray-400 font-semibold">
              {event.minTeam}-{event.maxTeam}
            </span>
          </div>
          <div className="w-full mt-4 sm:mt-0 sm:w-[45%] shadow bg-white p-4 rounded-md">
            <p className="text-gray-500 text-lg font-semibold mb-4">
              Registration Fee:{" "}
            </p>
            <span className="text-gray-400 font-semibold">
              {event.registrationFee == 0 ? (
                "Nada."
              ) : (
                <div className="flex items-center">
                  <HiOutlineCurrencyRupee className="text-xl mr-2" />
                  {event.registrationFee}
                </div>
              )}
            </span>
          </div>
        </div>
        <div className="bg-gray-100 rounded-2xl shadow p-5 md:p-12">
          <h2 className="text-gray-500 font-semibold text-xl mb-2">Rewards:</h2>
          <div className="rounded-2xl bg-white shadow p-4 mb-12">
            {event.rewards == ""
              ? "Opportunity to showcase talent!"
              : event.rewards}
          </div>
          <h2 className="text-gray-500 font-semibold text-xl mb-2">
            Eligibility:
          </h2>
          <div className="rounded-2xl bg-white shadow p-4">
            {event.eligibility == ""
              ? "You are always for us!"
              : event.eligibility}
          </div>
        </div>
        <div
          className={`${inputStyle} flex flex-col items-start justify-between`}
        >
          <h2 className="text-gray-500">Official Communication Platforms: </h2>
          <div className={`flex items-center ${inputStyle}`}>
            <div className="border-r-2">
              <BsTelephone className="text-xl text-green-300 mr-4" />
            </div>
            <div className="px-4">
              {event.contact == 0 ? (
                "No Contact Available"
              ) : (
                <Link href={`tel:${event.contact}`}>{event.contact}</Link>
              )}
            </div>
          </div>
          <div className={`flex items-center ${inputStyle}`}>
            <div className="border-r-2">
              <MdAlternateEmail className="text-xl text-green-300 mr-4" />
            </div>
            <div className="px-4">
              {event.email == "" ? (
                "No Email Available"
              ) : (
                <Link href={`malto:${event.email}`}>{event.email}</Link>
              )}
            </div>
          </div>
          <div className={`flex items-center ${inputStyle}`}>
            <div className="border-r-2">
              <SlGlobe className="text-xl text-green-300 mr-4" />
            </div>
            <div className="px-4">
              {event.website == "" ? (
                "No Website Available"
              ) : (
                <Link href={`${event.website}`}>{event.website}</Link>
              )}
            </div>
          </div>
          <div className={`flex items-center ${inputStyle}`}>
            <div className="border-r-2">
              <SlSocialYoutube className="text-xl text-green-300 mr-4" />
            </div>
            <div className="px-4">
              {event.youtube == "" ? (
                "No Youtube Available"
              ) : (
                <Link href={`${event.youtube}`}>{event.youtube}</Link>
              )}
            </div>
          </div>
          <div className={`flex items-center ${inputStyle}`}>
            <div className="border-r-2">
              <SlSocialLinkedin className="text-xl text-green-300 mr-4" />
            </div>
            <div className="px-4">
              {event.linkedin == "" ? (
                "No LinkedIn Available"
              ) : (
                <Link href={`${event.linkedin}`}>{event.linkedin}</Link>
              )}
            </div>
          </div>
          <div className={`flex items-center ${inputStyle}`}>
            <div className="border-r-2">
              <TfiInstagram className="text-xl text-green-300 mr-4" />
            </div>
            <div className="px-4">
              {event.instagram == "" ? (
                "No Instagram Available"
              ) : (
                <Link href={`${event.instagram}`}>{event.instagram}</Link>
              )}
            </div>
          </div>
          <div className={`flex items-center ${inputStyle}`}>
            <div className="border-r-2">
              <RxDiscordLogo className="text-xl text-green-300 mr-4" />
            </div>
            <div className="px-4">
              {event.discord == "" ? (
                "No Discord Available"
              ) : (
                <Link href={`${event.discord}`}>{event.discord}</Link>
              )}
            </div>
          </div>
          <div className={`flex items-center ${inputStyle}`}>
            <div className="border-r-2">
              <FaTelegramPlane className="text-xl text-green-300 mr-4" />
            </div>
            <div className="px-4">
              {event.telegram == "" ? (
                "No Telegram Available"
              ) : (
                <Link href={`${event.telegram}`}>{event.telegram}</Link>
              )}
            </div>
          </div>
          <div className={`flex items-center ${inputStyle}`}>
            <div className="border-r-2">
              <TfiTwitter className="text-xl text-green-300 mr-4" />
            </div>
            <div className="px-4">
              {event.twitter == "" ? (
                "No Twitter Available"
              ) : (
                <Link href={`${event.twitter}`}>{event.twitter}</Link>
              )}
            </div>
          </div>
          <div className={`flex items-center ${inputStyle}`}>
            <div className="border-r-2">
              <MdInsertLink className="text-2xl text-green-300 mr-4" />
            </div>
            <div className="px-4">
              {event.other == "" ? (
                "No Other Link Available"
              ) : (
                <Link href={`${event.other}`}>{event.other}</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventId;
