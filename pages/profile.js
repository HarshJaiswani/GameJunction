import React, { useContext, useEffect, useState } from "react";
// Next Components
import { useRouter } from "next/router";
// Custom Components
import EventCard from "../components/EventCard";
import RankCard from "../components/RankCard";
// Icons
import { AiFillHeart } from "react-icons/ai";
import ImageIcon from "../components/Icons/ImageIcon";
import { IoPencil } from "react-icons/io5";
// App Context
import { AppContext } from "../context/AppContext";

const Profile = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [currEvents, setCurrEvents] = useState([]);
  const [passEvents, setPassEvents] = useState([]);
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    const token = JSON.parse(localStorage.getItem("auth-token"));
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
      setUser(json.user);
      console.log(json.user.profile_pic);
      fetchEvents(json.user);
    }
  };
  const fetchEvents = async (curuser) => {
    const response = await fetch("/api/getevents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventids: curuser.events_participated }),
    });
    const json = await response.json();
    if (json.error) {
      alert("Some Error Occured!");
    } else {
      let currEvents = [];
      let passEvents = [];
      json.all_events.forEach((e) => {
        if (e.is_active) {
          currEvents.push(e);
        } else {
          passEvents.push(e);
        }
      });
      setCurrEvents(currEvents);
      setPassEvents(passEvents);
    }
  };
  return (
    <>
      {user && (
        <div className="p-5 sm:p-12 bg-gray-50 relative">
          <div className="absolute top-4 right-4 p-2 bg-cyan-800 rounded-full cursor-pointer">
            <IoPencil className="text-xl text-[yellow]" />
          </div>
          <div className="flex items-center flex-col md:flex-row">
            <div className="w-36 h-36 rounded-full shadow bg-gray-100 overflow-hidden flex items-center justify-center">
              {user.profile_pic == undefined ? (
                <ImageIcon className="text-5xl text-green-400" />
              ) : (
                <img src={user.profile_pic} alt="" />
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
              <div className="my-4 flex items-center justify-start flex-wrap">
                {user.sports.map((s, index) => (
                  <div
                    key={index}
                    className="px-6 py-2 rounded-full bg-gray-100 font-semibold font-sans text-green-400 mr-4 mb-4"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-4 sm:my-8">
            <h2 className="flex items-center justify-between">
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl inline-block whitespace-nowrap mr-4 text-gray-600 font-semibold my-4">
                Overall Rank
              </span>
              <div className="w-[80%] h-0.5 bg-gray-200"></div>
            </h2>
            <RankCard user={user} theme="light" />
          </div>
          {/* <RankCard type="participant" user={dataUser[0]} theme="light" /> */}
          <h2 className="flex items-center justify-between">
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl inline-block whitespace-nowrap mr-4 text-gray-600 font-semibold my-4">
              Current Participations
            </span>
            <div className="w-[70%] h-0.5 bg-gray-200"></div>
          </h2>
          <ul className="w-full sm:w-4/5 mx-auto flex items-center justify-evenly flex-wrap">
            {currEvents.length == 0 && "Participant in events to see them here"}
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
          <ul className="w-full sm:w-4/5 mx-auto flex items-center justify-evenly flex-wrap">
            {passEvents.length == 0 && "Participant in events to see them here"}
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
          <ul className="w-full sm:w-4/5 mx-auto flex items-center justify-evenly flex-wrap">
            {user.wishlist_events.length == 0 &&
              "Add events to your wishlist by clicking heart on events"}
            {user.wishlist_events.map((post) => (
              <EventCard key={post._id} post={post} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Profile;
