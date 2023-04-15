import React, { useContext, useEffect, useState } from "react";
// Headless Ui
import { Tab } from "@headlessui/react";
// Custom Components
import RankCard from "../components/RankCard";
// App Context
import { AppContext } from "../context/AppContext";
import SpinnerIcon from "../components/SpinnerIcon";
// Toast
import { toast } from "react-toastify";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const types = ["Organiser", "Participant"];

const Leaderboard = () => {
  const { isLoggedIn } = useContext(AppContext);
  const [organisers, setOrganisers] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
    if (isLoggedIn) {
      fetchCurrentUser();
    }
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
    if (!json.error) {
      setCurrentUser(json.user);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch("/api/leaderboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.error) {
      toast.error(`${json.error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setOrganisers(json.organisers);
      setParticipants(json.participants);
    }
    setLoading(false);
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
                {loading && (
                  <div className="flex items-center justify-center py-4">
                    <SpinnerIcon />
                  </div>
                )}
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
                    organisers.length == 0 &&
                    "More Organisers Coming Soon!"}
                  {type.toLowerCase() == "participant" &&
                    participants.length == 0 &&
                    "More Participants Coming Soon!"}
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
