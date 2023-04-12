import React from "react";
// Headless Ui
import { Tab } from "@headlessui/react";
// Custom Components
import RankCard from "../components/RankCard";

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
          <Tab.List className="flex w-full bg-white">
            {types.map((type, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    "w-full  rounded-t-xl py-2.5 font-sans font-semibold outline-none text-gray-500",
                    selected
                      ? "bg-gray-50"
                      : "text-gray-500 hover:text-green-400"
                  )
                }
              >
                {type.toUpperCase()}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="">
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
                      <div className="w-full sm:w-[80%] mx-auto">
                        <RankCard type={type} user={data[0]} theme="dark" />
                      </div>
                    )}
                  {type.toLowerCase() == "organiser" &&
                    data[0].organiser_rank && (
                      <div className="w-full sm:w-[80%] mx-auto">
                        <RankCard type={type} user={data[0]} theme="dark" />
                      </div>
                    )}
                </div>
                <ul className="w-full sm:w-4/5 mx-auto flex items-center justify-evenly flex-wrap">
                  {data.map(
                    (user) =>
                      user.stake.includes(type.toLowerCase()) && (
                        <RankCard
                          key={user.id}
                          user={user}
                          type={type}
                          theme="light"
                        />
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
