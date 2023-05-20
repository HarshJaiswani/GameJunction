import React, { Fragment, useContext, useEffect, useState } from "react";
// Next Components
import Link from "next/link";
import { useRouter } from "next/router";
// Custom Components
import EventCard from "../components/EventCard";
// Icons
import { AiFillHeart } from "react-icons/ai";
import ImageIcon from "../components/Icons/ImageIcon";
import { IoPencil } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { TbHomeInfinity } from "react-icons/tb";
import SpinnerIcon from "components/SpinnerIcon";
// App Context
import { AppContext } from "../context/AppContext";
// hooks
import useUser from "../hooks/useUser";
// services
import { getAllEvents, getUserEvents } from "../Services/Events";
import { deactivateUser } from "../Services/User";
// swr
import useSWR from "swr";
// HeadlessUi
import { Dialog, Transition } from "@headlessui/react";
// helper
import ShowToast from "helper/ShowToast";

const Profile = () => {
  const { user } = useUser();
  const router = useRouter();
  const { handleLogout } = useContext(AppContext);
  const [currEvents, setCurrEvents] = useState([]);
  const [passEvents, setPassEvents] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: allEvents, error } = useSWR("GETALLEVENTS", getAllEvents);

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

  useEffect(() => {
    if (user) {
      fetchEvents(user);
    }
  }, [user]);

  const fetchEvents = async (curuser) => {
    let json = await getUserEvents(curuser.events_participated);
    if (json.error) {
      ShowToast(false, json.error);
    } else {
      let currEvents = [];
      let passEvents = [];
      for await (let e of json.all_events) {
        if (e.is_active) {
          currEvents.push(e);
        } else {
          passEvents.push(e);
        }
      }
      setCurrEvents(currEvents);
      setPassEvents(passEvents);
    }
  };

  const handleDeleteUser = async () => {
    setIsSubmitting(true);
    let json = await deactivateUser();
    if (json.error) {
      ShowToast(false, json.error);
    } else {
      ShowToast(true, "Profile Deactivated!");
      handleLogout();
      router.push("/");
    }
    setIsSubmitting(false);
  };

  return (
    <>
      {user && (
        <div className="p-5 sm:p-12 bg-gray-50 relative">
          <div className="absolute top-4 right-4 flex items-center justify-evenly">
            <Link
              href="/signup?isEdit=true"
              className="p-2 mr-2 bg-cyan-800 rounded-full cursor-pointer"
            >
              <IoPencil className="text-xl text-[yellow]" />
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 bg-cyan-800 rounded-full cursor-pointer"
            >
              <AiFillDelete className="text-xl text-[yellow]" />
            </button>
          </div>
          <div className="flex items-center flex-col md:flex-row">
            <div className="w-36 h-36 rounded-full shadow bg-gray-100 overflow-hidden flex items-center justify-center">
              {user.profile_pic == undefined ? (
                <ImageIcon className="text-5xl text-green-400" />
              ) : (
                <img
                  src={user.profile_pic}
                  alt=""
                  onClick={(e) => openFullscreen(e.target)}
                />
              )}
            </div>
            <div className="mx-0 md:mx-8 mt-4 md:mt-0">
              <div className="flex items-center sm:flex-row flex-col">
                <h2 className="text-2xl font-semibold text-blue-400 mr-4">
                  {user.name}
                </h2>
                <div className="flex items-center justify-start my-4 sm:my-0">
                  {user.is_organiser && (
                    <div className="px-4 py-1 text-sm rounded-lg bg-yellow-200 mr-4">
                      Oragniser
                    </div>
                  )}
                  {user.is_participant && (
                    <div className="px-4 py-1 text-sm rounded-lg bg-yellow-200">
                      Participant
                    </div>
                  )}
                </div>
              </div>
              {/* to show email only when user is viewing his or her profile not in general profile */}
              <p className="text-gray-400 w-fit mx-auto sm:mx-0">
                {user.email}
              </p>
              <div className="mt-4 flex items-center sm:justify-start justify-center flex-wrap">
                {user.sports.map((s, index) => (
                  <div
                    key={index}
                    className="px-6 py-2 rounded-full bg-gray-100 font-semibold font-sans text-green-400 mr-4 mb-4"
                  >
                    {s}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-2 w-fit">
                  <TbHomeInfinity className="mr-2 text-xl text-teal-400" />
                  <span className="text-gray-500">
                    {user.is_organiser && (
                      <>
                        {" "}
                        <span>{user.organiser_points}</span>
                        <span className="text-xs text-gray-400">
                          (organiser)
                        </span>{" "}
                        &
                      </>
                    )}
                    {user.is_participant && (
                      <>
                        {" "}
                        <span>{user.participant_points}</span>
                        <span className="text-xs text-gray-400">
                          (participant)
                        </span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <h2 className="flex items-center justify-between mt-12">
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl inline-block whitespace-nowrap mr-4 text-gray-600 font-semibold my-4">
              Current Participations
            </span>
            <div className="w-[70%] h-0.5 bg-gray-200"></div>
          </h2>
          <ul className="w-full sm:w-4/5 mb-8 mx-auto flex items-center justify-evenly flex-wrap">
            {currEvents.length == 0 && (
              <span className="text-gray-400">
                Participant in events to see them here
              </span>
            )}
            {currEvents.map((event) => (
              <EventCard key={event._id} post={event} />
            ))}
          </ul>
          <h2 className="flex items-center justify-between" id="pastevents">
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl inline-block whitespace-nowrap mr-4 text-gray-600 font-semibold my-4">
              Past Participations
            </span>
            <div className="w-[70%] h-0.5 bg-gray-200"></div>
          </h2>
          <ul className="w-full sm:w-4/5 mb-8 mx-auto flex items-center justify-evenly flex-wrap">
            {passEvents.length == 0 && (
              <span className="text-gray-400">
                Participant in events to see them here
              </span>
            )}
            {passEvents.map((event) => (
              <EventCard key={event._id} post={event} />
            ))}
          </ul>
          <h2 className="flex items-center justify-between" id="wishevents">
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl inline-block whitespace-nowrap text-gray-600 font-semibold my-4">
              <AiFillHeart className="inline text-[red] mb-2 mr-2" />
              WishList
            </span>
            <div className="w-[80%] h-0.5 bg-gray-200"></div>
          </h2>
          <ul className="w-full sm:w-4/5 mb-8 mx-auto flex items-center justify-evenly flex-wrap">
            {user.wishlist_events.length == 0 && (
              <span className="text-gray-400">
                Add events to your wishlist by clicking heart on events
              </span>
            )}
            {allEvents?.map(
              (post) =>
                user.wishlist_events.includes(post._id.toString()) && (
                  <EventCard key={post._id} post={post} />
                )
            )}
          </ul>
        </div>
      )}
      {!user && (
        <div className="w-full min-h-[60vh] flex items-center justify-center text-2xl font-semibold text-orange-300">
          Loading...
        </div>
      )}
      {showDeleteModal && (
        <div className="w-full h-screen flex items-center justify-center z-[20]">
          <Transition appear show={showDeleteModal} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setShowDeleteModal(false)}
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
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        <span className="text-lg font-semibold text-red-400 mr-2">
                          SAD!
                        </span>
                        <span>Seeing You Go!</span>
                      </Dialog.Title>
                      <div className="mt-2 space-y-1 text-sm text-gray-500">
                        <p>Are you sure want to deactivate your profile ?</p>
                        <p>All your teams and events will be deleted!</p>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          disabled={isSubmitting}
                          className="px-6 py-2 mr-4 rounded bg-gray-100 text-green-400"
                          onClick={handleDeleteUser}
                        >
                          {isSubmitting && <SpinnerIcon />}
                          Yea!
                        </button>
                        <button
                          type="button"
                          className="px-6 py-2 rounded bg-gray-100 text-gray-500"
                          onClick={() => setShowDeleteModal(false)}
                        >
                          Nope!
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      )}
    </>
  );
};

export default Profile;
