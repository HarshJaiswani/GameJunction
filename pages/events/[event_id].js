import React, { Fragment, useContext, useEffect, useState } from "react";
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
import SpinnerIcon from "../../components/SpinnerIcon";
// hooks
import useUser from "../../hooks/useUser";
// services
import { applyIntoEvent, getSingleEvent } from "../../Services/Events";
import { fetchAllTeamsOfUser } from "Services/Teams";
// headlessui
import { Dialog, Transition } from "@headlessui/react";
// swr
import useSWR from "swr";
// helper
import ShowToast from "helper/ShowToast";

const EventId = () => {
  const router = useRouter();
  const { user } = useUser();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [event, setEvent] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);

  const {
    data: teams,
    error,
    mutate: mutateTeam,
  } = useSWR("TEAMS", fetchAllTeamsOfUser);

  useEffect(() => {
    if (router.isReady) {
      fetchEvent();
      if (user) {
        if (user.events_participated.includes(event?._id.toString())) {
          setIsApplied(true);
        } else {
          setIsApplied(false);
        }
      }
    }
  }, [router.isReady, user, event]);

  const inputStyle =
    "outline-none px-4 py-3 shadow bg-white rounded-2xl w-full text-gray-600 mt-4";

  const event_applyable = (e) => {
    e.preventDefault();
    if (event.organiserId == user?._id) {
      return ShowToast(false, "You are the organiser!");
    }
    if (isApplied) {
      let team_id = null;
      teams.filter((e) => {
        if (e.participations.includes(event._id)) {
          team_id = e._id;
        }
      });
      handleApplyEvent(team_id);
    } else {
      if (event.maxTeam > 1) {
        setShowTeamModal(true);
      } else {
        handleApplyEvent(false);
      }
    }
  };

  const handleApplyEvent = async (team_id) => {
    setIsSubmitting(true);
    if (user) {
      let json = await applyIntoEvent(event._id, isApplied, team_id);
      if (json.error) {
        ShowToast(false, json.error);
      } else {
        ShowToast(true, json.success);
        router.reload();
      }
    } else {
      router.push("/signin");
    }
    setIsSubmitting(false);
  };

  const openFullscreen = (elem) => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  };

  const fetchEvent = async () => {
    let json = await getSingleEvent(router.query.event_id);
    if (json.error) {
      ShowToast(false, json.error);
    } else {
      setEvent(json.event);
    }
  };

  const redirectToEvent = () => {
    if ((isApplied || event.organiserId == user?._id) && window) {
      window.open(event.link, "_blank");
    } else {
      ShowToast(false, "Event not applied!");
    }
  };

  return (
    <>
      {!event && (
        <div className="w-full min-h-[60vh] flex items-center justify-center text-3xl font-semibold text-yellow-400">
          Loading...
        </div>
      )}
      {event && (
        <div className="bg-gray-50 p-5 sm:py-12">
          {event.winner && (
            <div className="w-fit bg-gray-50 rounded-full text-center px-8 py-2 text-2xl mx-auto mb-8 shadow">
              <span className="text-gray-400">Winner : </span>
              <span className="text-yellow-400">
                {event.winner.split(",")[0]}
              </span>
            </div>
          )}
          <div className="w-full lg:w-2/3 mx-auto">
            <h2 className="text-3xl font-semibold text-gray-500 mb-4 text-center">
              {event.title}
            </h2>
            <div className="h-[350px] my-8 mx-auto overflow-hidden cursor-pointer flex flex-col items-center justify-center rounded-2xl bg-gray-100 shadow">
              {event.poster ? (
                <img
                  src={event.poster}
                  alt=""
                  onClick={(e) => openFullscreen(e.target)}
                />
              ) : (
                <>
                  <ImageIcon className="text-5xl text-green-400" />
                  <span className="text-gray-500 my-2">
                    Event&apos;s Poster
                  </span>
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
                onClick={event_applyable}
                disabled={isSubmitting}
                className={`w-full rounded-lg font-semibold ${
                  isApplied
                    ? "bg-yellow-500 hover:bg-yellow-400"
                    : "bg-blue-500 hover:bg-blue-500"
                } my-4 text-white shadow py-2`}
              >
                {isSubmitting && <SpinnerIcon />}
                {isApplied ? "Withdraw" : "Apply Now"}
              </button>
            </div>
            <div className="px-6 py-4 text-lg rounded-md bg-white shadow">
              <span className="text-gray-400">Theme:</span>{" "}
              <span className="text-red-400 font-semibold">
                {event.theme || "No Theme"}
              </span>
            </div>
            <div className="my-8 whitespace-pre-wrap text-gray-400 text-lg">
              {event.details}
            </div>
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
                  <div
                    onClick={redirectToEvent}
                    className="cursor-pointer px-8 py-2 rounded-2xl w-fit mx-4 my-2 bg-gray-100 text-green-400 font-semibold"
                  >
                    Link to event
                  </div>
                </>
              ) : (
                <div className="px-8 py-2 rounded-2xl w-fit mx-4 my-2 bg-gray-100 text-green-400 font-semibold">
                  {event.location}
                </div>
              )}
            </div>
            <div className="p-5 md:p-12 flex flex-wrap items-center justify-between border rounded-2xl bg-gray-100 shadow mx-auto mb-4">
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
                  <div className="flex items-center">
                    <HiOutlineCurrencyRupee className="text-xl mr-2" />
                    {event.registrationFee}
                  </div>
                </span>
              </div>
            </div>
            {event.payment_method && (
              <div className="bg-gray-100 rounded-2xl shadow p-5 mb-8">
                <h2 className="text-gray-500 font-semibold text-xl mb-2">
                  Payment Method
                </h2>
                <div className="rounded-2xl bg-white shadow p-4">
                  {event.payment_method}
                </div>
              </div>
            )}
            <div className="bg-gray-100 rounded-2xl shadow p-5 md:p-12">
              <h2 className="text-gray-500 font-semibold text-xl mb-2">
                Rewards:
              </h2>
              <div className="rounded-2xl whitespace-pre-wrap bg-white shadow p-4 mb-12">
                {event.rewards == ""
                  ? "Opportunity to showcase talent!"
                  : event.rewards}
              </div>
              <h2 className="text-gray-500 font-semibold text-xl mb-2">
                Eligibility:
              </h2>
              <div className="rounded-2xl whitespace-pre-wrap bg-white shadow p-4">
                {event.eligibility == ""
                  ? "You are always for us!"
                  : event.eligibility}
              </div>
            </div>
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
                <div className="px-4">
                  {event.contact == 0 ? (
                    "No Contact Available"
                  ) : (
                    <a href={`tel:${event.contact}`}>{event.contact}</a>
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
                    <a href={`malto:${event.email}`} className="break-words">
                      {event.email}
                    </a>
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
                    <a href={`${event.website}`} className="break-words">
                      {event.website}
                    </a>
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
                    <a href={`${event.youtube}`} className="break-words">
                      {event.youtube}
                    </a>
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
                    <a href={`${event.linkedin}`} className="break-words">
                      {event.linkedin}
                    </a>
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
                    <a href={`${event.instagram}`} className="break-words">
                      {event.instagram}
                    </a>
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
                    <a href={`${event.discord}`} className="break-words">
                      {event.discord}
                    </a>
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
                    <a href={`${event.telegram}`} className="break-words">
                      {event.telegram}
                    </a>
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
                    <a href={`${event.twitter}`} className="break-words">
                      {event.twitter}
                    </a>
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
                    <a href={`${event.other}`} className="break-words">
                      {event.other}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showTeamModal && (
        <>
          <Transition appear show={showTeamModal} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setShowTeamModal(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-[90%] sm:w-[80%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Select Team!
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          This is a team event, select your team to participat
                          in event!
                        </p>
                      </div>

                      <div className="my-4">
                        {event.minTeam == 1 && (
                          <div className="w-full bg-green-400/10 rounded-md px-4 py-3 my-2 flex items-center justify-between">
                            <p className="">Participate Individually</p>
                            <button
                              onClick={() => {
                                handleApplyEvent(false);
                                setShowTeamModal(false);
                              }}
                              className="px-4 py-1 rounded-md bg-green-400 text-white"
                            >
                              Apply
                            </button>
                          </div>
                        )}
                        <h2 className="text-lg font-medium my-4">Your Teams</h2>
                        <div>
                          {!teams && (
                            <div className="w-full flex items-center justify-center py-8">
                              <SpinnerIcon noMargin={true} />
                            </div>
                          )}
                          {teams?.map(
                            (team, index) =>
                              team.participants.filter(
                                (e) => e.participant_id == user.email
                              )[0]?.is_leader &&
                              team.participants.length >= event.minTeam &&
                              team.participants.length <= event.maxTeam && (
                                <div
                                  key={index}
                                  className="w-full bg-green-400/10 rounded-md px-4 py-3 my-2 flex items-center justify-between"
                                >
                                  <p>{team.team_name}</p>
                                  <button
                                    onClick={() => {
                                      handleApplyEvent(team._id);
                                      setShowTeamModal(false);
                                    }}
                                    className="px-4 py-1 rounded-md bg-green-400 text-white"
                                  >
                                    Apply
                                  </button>
                                </div>
                              )
                          )}
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="rounded-md border border-transparent bg-gray-100 px-6 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 ml-auto block"
                          onClick={() => setShowTeamModal(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      )}
    </>
  );
};

export default EventId;
