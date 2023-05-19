import React, { Fragment, useContext, useEffect, useState } from "react";
// Next Components
import Link from "next/link";
import { useRouter } from "next/router";
// Icons
import { TiArrowForwardOutline } from "react-icons/ti";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import SpinnerIcon from "./SpinnerIcon";
// hooks
import useUser from "../hooks/useUser";
// swr
import useSWR, { mutate } from "swr";
// services
import { addToWishList, applyIntoEvent } from "../Services/Events";
import { fetchAllTeamsOfUser } from "Services/Teams";
// headless ui
import { Dialog, Transition } from "@headlessui/react";
// helper
import ShowToast from "helper/ShowToast";

const EventCard = ({ post }) => {
  const router = useRouter();
  const { user, mutate: mutateUser } = useUser();

  const {
    data: teams,
    error,
    mutate: mutateTeam,
  } = useSWR("TEAMS", fetchAllTeamsOfUser);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlisting, setWishlisting] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.events_participated.includes(post._id.toString())) {
        setIsApplied(true);
      } else {
        setIsApplied(false);
      }
      if (user.wishlist_events.includes(post._id.toString())) {
        setIsWishlisted(true);
      } else {
        setIsWishlisted(false);
      }
    }
  }, [user, post]);

  const event_applyable = (e) => {
    e.preventDefault();
    if (post.organiserId == user?._id) {
      return ShowToast(false, "You are the organiser!");
    }
    if (isApplied) {
      let team_id = null;
      teams.filter((e) => {
        if (e.participations.includes(post._id)) {
          team_id = e._id;
        }
      });
      handleApplyEvent(team_id);
    } else {
      if (post.maxTeam > 1) {
        setShowTeamModal(true);
      } else {
        handleApplyEvent(false);
      }
    }
  };

  const handleApplyEvent = async (team_id) => {
    setIsSubmitting(true);

    if (user) {
      let json = await applyIntoEvent(post._id, isApplied, team_id);
      if (json.error) {
        ShowToast(false, json.error);
      } else {
        ShowToast(true, json.success);
        mutateUser();
        mutate("GETALLEVENTS");
      }
    } else {
      router.push("/signin");
    }
    setIsSubmitting(false);
  };

  const handleAddToWishList = async () => {
    if (user) {
      setWishlisting(true);
      let json = await addToWishList(post._id, isWishlisted);
      if (json.error) {
        setWishlisting(false);
        ShowToast(false, json.error);
      } else {
        setWishlisting(false);
        ShowToast(true, json.success);
        mutateUser();
      }
    } else {
      ShowToast(false, "Kindly SignIn!");
    }
  };

  const handleEventShare = () => {
    if (navigator && window) {
      navigator.clipboard.writeText(
        `${window.location.origin}/events/${post.slug}`
      );
      ShowToast(true, "Event Link Copied!");
    }
  };

  return (
    <li className="w-full md:w-[45%] my-4 cursor-pointer rounded-2xl ring-2 ring-gray-100 bg-white hover:ring-teal-200">
      <Link href={`/events/${post.slug}`}>
        <div className="p-4 flex items-center justify-between">
          <div className="">
            <h3 className="text-lg font-semibold font-sans nunito-font">
              {post.title.toUpperCase()}
            </h3>
            <div className="flex items-center">
              <span className="text-gray-300 mr-2">by</span>
              <span className="text-yellow-400 text-sm font-semibold">
                {post.organiserName.toUpperCase()}
              </span>
            </div>
          </div>
          <div
            className="flex items-center"
            onClick={(e) => e.preventDefault()}
          >
            <div
              onClick={handleAddToWishList}
              className="p-2 rounded-full mx-2 bg-gray-100/60 hover:ring-2 hover:ring-teal-200 shadow w-fit"
            >
              {wishlisting && <SpinnerIcon noMargin={true} />}
              {!wishlisting &&
                (isWishlisted ? (
                  <AiFillHeart className="text-[red] text-2xl" />
                ) : (
                  <AiOutlineHeart className="text-[gray] text-2xl" />
                ))}
            </div>
            <div
              onClick={handleEventShare}
              className="p-2 rounded-full mx-2 bg-gray-100/60 hover:ring-2 hover:ring-teal-200 shadow w-fit"
            >
              <TiArrowForwardOutline className="text-blue-400 text-2xl" />
            </div>
          </div>
        </div>
        <div className="bg-gray-50/50 p-4 flex items-center justify-between flex-wrap">
          {/* {post.shortDescp} */}
          <div className="mr-4">
            <span className="text-gray-300">Theme : </span>
            <div className="px-6 py-2 rounded-full border text-gray-400 w-fit">
              {post.theme || "No Theme"}
            </div>
          </div>
          <div className="text-gray-400 font-semibold my-4">
            <span className="text-green-500">{post.participants.length}+</span>{" "}
            Participants
          </div>
        </div>
        <div className="sm:mb-4 p-4 flex items-center justify-start flex-wrap text-gray-400 text-sm font-semibold">
          <div className="px-4 py-2 rounded-xl bg-gray-100 tracking-wider m-2">
            {post.sport}
          </div>
          <div className="px-4 py-2 rounded-xl bg-gray-100 tracking-wider m-2">
            {post.mode}
          </div>
          <div className="px-4 py-2 rounded-xl bg-gray-100 tracking-wider m-2">
            Team: {post.minTeam}-{post.maxTeam}
          </div>
        </div>
        <div className="p-4 flex items-center justify-between sm:flex-row flex-col">
          <div className="sm:flex items-start justify-start flex-col">
            <span className="text-gray-500 mr-2">Registration Fee: </span>
            <span className="text-teal-400 font-sans font-semibold">
              Rs. {post.registrationFee || "0"}
            </span>
          </div>
          {post.is_active ? (
            <button
              onClick={event_applyable}
              disabled={isSubmitting}
              className={`my-4 sm:my-0 ml-auto block w-full sm:w-fit px-4 py-2 sm:py-2.5 rounded-lg ${
                isApplied
                  ? "bg-yellow-500 hover:bg-yellow-400"
                  : "bg-blue-500 hover:bg-blue-500"
              } text-white`}
            >
              {isSubmitting && <SpinnerIcon />}
              {isApplied ? "Withdraw" : "Apply Now"}
            </button>
          ) : (
            <button className="ml-auto hover:bg-yellow-400 block px-4 py-2.5 rounded-lg bg-yellow-500 text-white">
              View Details
            </button>
          )}
        </div>
      </Link>
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
                        {post.minTeam == 1 && (
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
                                (e) => e.participant_id == user?.email
                              )[0]?.is_leader &&
                              team.participants.length >= post.minTeam &&
                              team.participants.length <= post.maxTeam && (
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
                          <p>No More Teams!</p>
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
    </li>
  );
};

export default EventCard;
