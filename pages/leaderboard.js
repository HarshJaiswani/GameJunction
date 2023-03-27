import React from "react";
// Headless Ui
import { Tab } from "@headlessui/react";
// Icons
import { TiArrowForwardOutline } from "react-icons/ti";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// data[0] is the current logged in user fetch it from context

const Leaderboard = () => {
  const types = ["Organiser", "Participant"];
  const data = Array(5).fill({
    id: 5,
    name: "Harsh Jaiswani",
    email: "dummyemail@gmail.com",
    age: 20,
    gender: "Male",
    sports: ["Cricket", "Football"],
    stake: "organiser,participant",
    organiser_rank: 52,
    participant_rank: 63,
    profile_pic: "",
    events_participated: 5,
    events_oraganised: 2,
    prices_won: 1,
    overall_ranking: 2, //every event will have a rating of 5 then average of all the events of a organiser is ranking
  });
  return (
    <div>
      <div className="w-full mx-auto">
        <Tab.Group>
          <Tab.List className="flex w-1/3 mx-auto space-x-1 rounded-xl px-2 bg-[#3770ff]/10 p-1">
            {types.map((type, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-xl py-2.5 font-sans font-semibold outline-none leading-5 text-white",
                    selected
                      ? "bg-[#3770ff] shadow"
                      : "text-[#3770ff] hover:bg-[#3770ff]/20"
                  )
                }
              >
                {type.toUpperCase()}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {types.map((type, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  "rounded-xl p-3 bg-gray-50 w-full min-h-[75vh]"
                )}
              >
                <div>
                  {type.toLowerCase() == "participant" &&
                    data[0].participant_rank && (
                      <div className="w-[80%] mx-auto">
                        <li className="w-full flex items-center justify-center">
                          <div className="px-4 py-2 font-semibold text-gray-400 text-lg bg-gray-200/50 rounded-tl-lg rounded-bl-lg">
                            <span className="icon-font text-gray-400 text-xl font-semibold">
                              #
                            </span>
                            <span>
                              {type.toLowerCase() == "organiser"
                                ? data[0].organiser_rank
                                : data[0].participant_rank}
                            </span>
                          </div>
                          <div className="w-full bg-cyan-800 my-4 p-4 flex items-center justify-between cursor-pointer rounded-2xl shadow text-white">
                            <div className="flex items-center">
                              <div className="rounded-full p-1 mr-4 w-10 h-10 bg-gray-200"></div>
                              <h3 className="text-lg font-semibold font-sans nunito-font">
                                {data[0].name.toUpperCase()}
                              </h3>
                            </div>
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-yellow-200 mx-2 flex items-center justify-center font-semibold text-gray-500">
                                {data[0].events_oraganised}
                              </div>
                              <div className="w-10 h-10 rounded-full bg-teal-200 mx-2 flex items-center justify-center font-semibold text-gray-500">
                                {data[0].overall_ranking}
                              </div>
                            </div>
                          </div>
                        </li>
                      </div>
                    )}
                  {type.toLowerCase() == "organiser" &&
                    data[0].organiser_rank && (
                      <div className="w-[80%] mx-auto">
                        <li className="w-full flex items-center justify-center">
                          <div className="px-4 py-2 font-semibold text-gray-400 text-lg bg-gray-200/50 rounded-tl-lg rounded-bl-lg">
                            <span className="icon-font text-gray-400 text-xl font-semibold">
                              #
                            </span>
                            <span>
                              {type.toLowerCase() == "organiser"
                                ? data[0].organiser_rank
                                : data[0].participant_rank}
                            </span>
                          </div>
                          <div className="w-full bg-cyan-800 text-white my-4 p-4 flex items-center justify-between cursor-pointer rounded-2xl shadow">
                            <div className="flex items-center">
                              <div className="rounded-full p-1 mr-4 w-10 h-10 bg-gray-200"></div>
                              <h3 className="text-lg font-semibold font-sans nunito-font">
                                {data[0].name.toUpperCase()}
                              </h3>
                            </div>
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-yellow-200 mx-2 flex items-center justify-center font-semibold text-gray-500">
                                {data[0].events_oraganised}
                              </div>
                              <div className="w-10 h-10 rounded-full bg-teal-200 mx-2 flex items-center justify-center font-semibold text-gray-500">
                                {data[0].overall_ranking}
                              </div>
                            </div>
                          </div>
                        </li>
                      </div>
                    )}
                </div>
                <ul className="w-4/5 mx-auto flex items-center justify-evenly flex-wrap">
                  {data.map(
                    (user) =>
                      user.stake.includes(type.toLowerCase()) && (
                        <li
                          key={user.id}
                          className="w-full flex items-center justify-center"
                        >
                          <div className="px-4 py-2 font-semibold text-gray-400 text-lg bg-gray-200/50 rounded-tl-lg rounded-bl-lg">
                            <span className="icon-font text-gray-400 text-xl font-semibold">
                              #
                            </span>
                            <span>
                              {type.toLowerCase() == "organiser"
                                ? user.organiser_rank
                                : user.participant_rank}
                            </span>
                          </div>
                          <div className="w-full my-4 p-4 flex items-center justify-between cursor-pointer rounded-2xl shadow bg-white">
                            <div className="flex items-center">
                              <div className="rounded-full p-1 mr-4 w-10 h-10 bg-gray-200"></div>
                              <h3 className="text-lg font-semibold font-sans nunito-font">
                                {user.name.toUpperCase()}
                              </h3>
                            </div>
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-yellow-200 mx-2 flex items-center justify-center font-semibold text-gray-500">
                                {user.events_oraganised}
                              </div>
                              <div className="w-10 h-10 rounded-full bg-teal-200 mx-2 flex items-center justify-center font-semibold text-gray-500">
                                {user.overall_ranking}
                              </div>
                            </div>
                          </div>
                        </li>
                      )
                  )}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Leaderboard;
