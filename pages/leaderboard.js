import React, { useEffect, useState } from "react";
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
  const [organisers, setOrganisers] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    fetchUsers();
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    let token = JSON.parse(localStorage.getItem("auth-token"));
    const response = await fetch("/api/getusers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ token }),
    });
    const json = await response.json();
    if (json.error) {
      alert("Some Error Occured!");
    } else {
      setCurrentUser(json.user);
    }
  };
  const fetchUsers = async () => {
    const response = await fetch("/api/leaderboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.error) {
      alert("Some Error Occured!");
    } else {
      setOrganisers(json.organisers);
      setParticipants(json.participants);
    }
  };
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
                {currentUser && (
                  <div>
                    {type.toLowerCase() == "participant" &&
                      currentUser.is_participant && (
                        <div className="w-full sm:w-[80%] mx-auto">
                          <RankCard user={currentUser} theme="dark" />
                        </div>
                      )}
                    {type.toLowerCase() == "organiser" &&
                      currentUser.is_organiser && (
                        <div className="w-full sm:w-[80%] mx-auto">
                          <RankCard user={currentUser} theme="dark" />
                        </div>
                      )}
                  </div>
                )}
                <ul className="w-full sm:w-4/5 mx-auto flex items-center justify-evenly flex-wrap">
                  {type.toLowerCase() == "organiser" &&
                    organisers.map((or) => (
                      <RankCard key={or._id} user={or} theme="light" />
                    ))}
                  {type.toLowerCase() == "participant" &&
                    participants.map((pr) => (
                      <RankCard key={pr._id} user={pr} theme="light" />
                    ))}
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
