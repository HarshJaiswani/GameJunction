import React, { Fragment, useContext, useEffect, useState } from "react";
// Next Components
import { useRouter } from "next/router";
import Link from "next/link";
// Custom Components
import Navbar from "../Navbar";
import Footer from "../Footer";
// Healdess UI
import { Dialog, Disclosure, RadioGroup, Transition } from "@headlessui/react";
// Icons
import { IoPencil } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import CheckIcon from "../Icons/CheckIcon";
import { BsSendFill } from "react-icons/bs";
import SpinnerIcon from "components/SpinnerIcon";
// hooks
import useUser from "../../hooks/useUser";
// services
import {
  deleteEvent,
  getEventParticipants,
  getUserEvents,
  setWinner,
} from "../../Services/Events";
// helper
import ShowToast from "helper/ShowToast";

const Organiser = () => {
  const router = useRouter();
  const { user } = useUser();

  const [allEvents, setAllEvents] = useState([]);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [allParticipants, setAllParticipants] = useState({});
  const [closingEvent, setClosingEvent] = useState(0);
  const [selectedWinner, setSelectedWinner] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserEvents();
    }
  }, [user]);

  const fetchUserEvents = async () => {
    let json = await getUserEvents(user.events_organised);
    if (json.error) {
      ShowToast(false, json.error);
    } else {
      setAllEvents(json.all_events);
      let curatedData = {};
      await json.all_events.forEach(async (e) => {
        let result = await getParticipants(e.participants);
        curatedData[e._id] = result;
      });
      setAllParticipants(curatedData);
    }
  };

  const handleCloseEvent = (id) => {
    setShowWinnerModal(true);
    setClosingEvent(id);
  };

  const getParticipants = async (ids) => {
    let json = await getEventParticipants(ids);
    if (json.error) {
      ShowToast(false, json.error);
    } else {
      return json;
    }
  };

  const handleSetWinner = async () => {
    if (selectedWinner.length == 0) {
      return ShowToast(false, "No Participant Selected!");
    }
    setIsSubmitting(true);
    let json = await setWinner(closingEvent, selectedWinner);
    if (json.error) {
      ShowToast(false, json.error);
    } else {
      setShowWinnerModal(false);
      router.push("/list");
    }
    setIsSubmitting(false);
  };

  const handleEventDelete = async (id) => {
    setIsSubmitting(true);
    let json = await deleteEvent(id);
    if (json.error) {
      ShowToast(false, json.error);
    } else {
      ShowToast(true, json.success);
      fetchUserEvents();
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        <div className="w-[95%] lg:w-[80%] pt-12 mx-auto">
          <div className="w-full mb-8 p-8 sm:p-12 flex flex-wrap items-center justify-between mx-auto rounded-2xl shadow bg-gradient-to-r from-[#091921] to-cyan-500">
            <div>
              <h2 className="text-2xl text-[white]">
                Want your event to be featured on top?
              </h2>
              <p className="my-2 text-lg text-white">
                Contact Us with the link to your event and we will get back to
                you as soon as possible
              </p>
            </div>
            <Link href={`mailto:game.junction.official@gmail.com`}>
              <button className="px-6 py-2 mt-4 sm:mt-0 rounded-full bg-white hover:bg-yellow-300 shadow text-gray-500 font-semibold">
                Contact Us
              </button>
            </Link>
          </div>
          <div className="py-4 sm:py-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-semibold my-4">
              Current Events
            </h2>
            <div>
              {allEvents.filter((e) => e.is_active).length == 0 &&
                "Create new events to list them here!"}
              {!allEvents && (
                <div className="py-4 flex items-center justify-center w-full">
                  <SpinnerIcon noMargin={true} />
                </div>
              )}
              {allEvents.map(
                (e) =>
                  e.is_active && (
                    <Disclosure key={e._id}>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex items-center flex-wrap md:flex-row flex-col-reverse w-full mb-4 justify-between rounded-lg bg-white shadow p-4">
                            <div className="font-semibold font-sans my-4 md:my-0">
                              {e.title}
                            </div>
                            <div className="flex items-center justify-evenly">
                              <Link
                                href={`/organise-event?slug=${e.slug}`}
                                className="p-2 bg-cyan-800 rounded-full mr-2 cursor-pointer"
                              >
                                <IoPencil className="text-xl text-[#ffffff]" />
                              </Link>
                              <div
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  !isSubmitting && handleEventDelete(e._id);
                                }}
                                className="p-2 bg-cyan-800 rounded-full mr-2 cursor-pointer"
                              >
                                <AiFillDelete className="text-xl text-[white]" />
                              </div>
                              <div
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  handleCloseEvent(e._id);
                                }}
                                className="p-2 bg-cyan-800 mr-2 rounded-full cursor-pointer"
                              >
                                <TiTick className="text-xl text-[white]" />
                              </div>
                              <Link
                                href={`/events/${e.slug}`}
                                className="p-2.5 bg-cyan-800 mr-2 rounded-full cursor-pointer"
                              >
                                <BsSendFill className="text-[white]" />
                              </Link>
                            </div>
                          </Disclosure.Button>
                          <Disclosure.Panel className="sm:px-4 pb-4 text-sm text-gray-500">
                            <div className="w-fit py-2 rounded-md sm:text-lg">
                              <span className="text-gray-400">
                                Total Participants:
                              </span>{" "}
                              <span className="text-green-400 mx-1">
                                {e.participants.length}
                              </span>
                            </div>
                            {!allParticipants && (
                              <div className="py-4 flex items-center justify-center w-full">
                                <SpinnerIcon noMargin={true} />
                              </div>
                            )}
                            {allParticipants[e._id]?.map((p, index) => (
                              <div key={index} className="space-y-4">
                                {p.is_team && (
                                  <div className="w-full p-4 bg-white shadow rounded-2xl">
                                    <h2 className="mb-2 text-lg font-semibold text-gray-500">
                                      {p.team_name}
                                    </h2>
                                    <div className="divide-y divide-gray-200">
                                      {p.people.map((mem, index) => (
                                        <div
                                          key={index}
                                          className="text-gray-500 py-2 flex items-center justify-start flex-wrap"
                                        >
                                          <div className="m-2 px-4 bg-gray-50 w-fit py-2 rounded-md shadow-sm text-gray-400">
                                            Name:{" "}
                                            <span className="text-gray-600 font-semibold tracking-wide">
                                              {mem.name}
                                            </span>
                                          </div>
                                          <div className="m-2 px-4 bg-gray-50 w-fit py-2 rounded-md shadow-sm text-gray-400">
                                            Email:{" "}
                                            <span className="text-gray-600 font-semibold tracking-wide">
                                              {mem.email}
                                            </span>
                                          </div>
                                          <div className="m-2 px-4 bg-gray-50 w-fit py-2 rounded-md shadow-sm text-gray-400">
                                            Contact:{" "}
                                            <span className="text-gray-600 font-semibold tracking-wide">
                                              {mem.contact}
                                            </span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {!p.is_team && (
                                  <div
                                    key={index}
                                    className="bg-white shadow rounded-2xl text-gray-500 py-2 flex items-center justify-start flex-wrap"
                                  >
                                    <div className="m-2 px-4 bg-gray-50 w-fit py-2 rounded-md shadow-sm text-gray-400">
                                      Name:{" "}
                                      <span className="text-gray-600 font-semibold tracking-wide">
                                        {p.people[0].name}
                                      </span>
                                    </div>
                                    <div className="m-2 px-4 bg-gray-50 w-fit py-2 rounded-md shadow-sm text-gray-400">
                                      Email:{" "}
                                      <span className="text-gray-600 font-semibold tracking-wide">
                                        {p.people[0].email}
                                      </span>
                                    </div>
                                    <div className="m-2 px-4 bg-gray-50 w-fit py-2 rounded-md shadow-sm text-gray-400">
                                      Contact:{" "}
                                      <span className="text-gray-600 font-semibold tracking-wide">
                                        {p.people[0].contact}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )
              )}
            </div>
          </div>
          <div className="py-4 sm:py-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-semibold my-4">
              Past Events
            </h2>
            <div>
              {allEvents.filter((e) => !e.is_active).length == 0 &&
                "No past events available!"}
              {!allEvents && (
                <div className="py-4 flex items-center justify-center w-full">
                  <SpinnerIcon noMargin={true} />
                </div>
              )}
              {allEvents.map(
                (e) =>
                  !e.is_active && (
                    <Disclosure key={e._id}>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex items-center w-full mb-4 justify-between rounded-lg bg-white shadow p-4">
                            <Link
                              href={`/events/${e._id}`}
                              className="font-semibold font-sans"
                            >
                              {e.title}
                            </Link>
                            <div className="flex items-center justify-evenly">
                              <div
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  !isSubmitting && handleEventDelete(e._id);
                                }}
                                className="p-2 bg-cyan-800 rounded-full mr-2 cursor-pointer"
                              >
                                <AiFillDelete className="text-xl text-[white]" />
                              </div>
                            </div>
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pb-4 text-sm text-gray-500">
                            <div className="w-fit py-2 rounded-md">
                              <span className="text-gray-400">
                                Total Participants:
                              </span>{" "}
                              <span className="text-green-400 text-lg">
                                {e.participants.length}
                              </span>
                            </div>
                            {!allParticipants && (
                              <div className="py-4 flex items-center justify-center w-full">
                                <SpinnerIcon noMargin={true} />
                              </div>
                            )}
                            {allParticipants[e._id]?.map((p, index) => (
                              <>
                                {p.is_team && (
                                  <div className="w-full p-4 bg-white shadow rounded-2xl">
                                    <h2 className="mb-2 text-lg font-semibold text-gray-500">
                                      {p.team_name}
                                    </h2>
                                    <div className="divide-y divide-gray-200">
                                      {p.people.map((mem, index) => (
                                        <div
                                          key={index}
                                          className="text-gray-500 py-2 flex items-center justify-start flex-wrap"
                                        >
                                          <div className="m-2 px-4 bg-gray-50 w-fit py-2 rounded-md shadow-sm text-gray-400">
                                            Name:{" "}
                                            <span className="text-gray-600 font-semibold tracking-wide">
                                              {mem.name}
                                            </span>
                                          </div>
                                          <div className="m-2 px-4 bg-gray-50 w-fit py-2 rounded-md shadow-sm text-gray-400">
                                            Email:{" "}
                                            <span className="text-gray-600 font-semibold tracking-wide">
                                              {mem.email}
                                            </span>
                                          </div>
                                          <div className="m-2 px-4 bg-gray-50 w-fit py-2 rounded-md shadow-sm text-gray-400">
                                            Contact:{" "}
                                            <span className="text-gray-600 font-semibold tracking-wide">
                                              {mem.contact}
                                            </span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {!p.is_team && (
                                  <div
                                    key={index}
                                    className="bg-white shadow rounded-2xl text-gray-500 py-2 flex items-center justify-start flex-wrap"
                                  >
                                    <div className="m-2 px-4 bg-gray-50 w-fit py-2 rounded-md shadow-sm text-gray-400">
                                      Name:{" "}
                                      <span className="text-gray-600 font-semibold tracking-wide">
                                        {p.people[0].name}
                                      </span>
                                    </div>
                                    <div className="m-2 px-4 bg-gray-50 w-fit py-2 rounded-md shadow-sm text-gray-400">
                                      Email:{" "}
                                      <span className="text-gray-600 font-semibold tracking-wide">
                                        {p.people[0].email}
                                      </span>
                                    </div>
                                    <div className="m-2 px-4 bg-gray-50 w-fit py-2 rounded-md shadow-sm text-gray-400">
                                      Contact:{" "}
                                      <span className="text-gray-600 font-semibold tracking-wide">
                                        {p.people[0].contact}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
      {showWinnerModal && (
        <div className="w-full h-screen flex items-center justify-center absolute top-0 left-0">
          <Transition appear show={showWinnerModal} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setShowWinnerModal(false)}
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
                    <Dialog.Panel className="w-[90%] sm:w-[70%] md:w-1/2 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Select Winner of the Event!
                      </Dialog.Title>
                      <div className="w-full sm:w-2/3 my-4">
                        <RadioGroup
                          value={selectedWinner}
                          onChange={setSelectedWinner}
                        >
                          <div className="space-y-2">
                            {allParticipants[closingEvent].length == 0 &&
                              "No Participants Available!"}
                            {!allParticipants && (
                              <div className="py-4 flex items-center justify-center w-full">
                                <SpinnerIcon noMargin={true} />
                              </div>
                            )}
                            {allParticipants[closingEvent]?.map((p, index) => (
                              <RadioGroup.Option
                                key={index}
                                value={p.is_team ? p.team_id : p.people[0]._id}
                                className={({ active, checked }) =>
                                  `${active ? "ring-2 ring-blue-200" : ""} ${
                                    checked ? "bg-gray-500" : "bg-white"
                                  } relative flex cursor-pointer rounded-lg border p-2 focus:outline-none`
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
                                              checked
                                                ? "text-white"
                                                : "text-gray-500"
                                            }`}
                                          >
                                            {p.is_team && <>{p.team_name}</>}
                                            {!p.is_team && (
                                              <>{p.people[0].email}</>
                                            )}
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

                      <div className="mt-4">
                        <button
                          disabled={isSubmitting}
                          className="cursor-pointer inline-flex justify-center rounded bg-gray-100 px-6 py-2 text-sm font-medium text-green-500"
                          onClick={handleSetWinner}
                        >
                          {isSubmitting && <SpinnerIcon />}
                          Save
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
      <Footer />
    </>
  );
};

export default Organiser;
