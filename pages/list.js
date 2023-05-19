import React, { useEffect, useState } from "react";
// Next Components
// Headless Ui
import { Tab } from "@headlessui/react";
// Icons
import ImageIcon from "../components/Icons/ImageIcon";
// Custom Components
import EventCard from "../components/EventCard";
// Icons
import SpinnerIcon from "../components/SpinnerIcon";
// services
import { getAllEvents } from "../Services/Events";
// swr
import useSWR from "swr";
// hooks
import useUser from "../hooks/useUser";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const types = ["Sport", "ESport"];

const List = () => {
  const user = useUser();
  const { data, error } = useSWR("GETALLEVENTS", getAllEvents);
  const [featuredEvent, setFeaturedEvent] = useState(null);

  useEffect(() => {
    if (data) {
      data.forEach((e) => {
        if (e.is_featured) {
          setFeaturedEvent(e);
        }
      });
    }
  }, [data]);

  return (
    <div>
      <div className="w-full mx-auto bg-gray-50">
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
                className={classNames("rounded-xl p-5 w-full min-h-[75vh]")}
              >
                {!data && (
                  <div className="flex items-center justify-center py-4">
                    <SpinnerIcon />
                  </div>
                )}
                <div className="w-full lg:w-4/5 mx-auto">
                  {featuredEvent && (
                    <div className="md:flex items-center justify-evenly">
                      <div className="w-full md:w-[45%] overflow-hidden h-[350px] my-8 cursor-pointer flex flex-col items-center justify-center rounded-2xl bg-gray-100 shadow">
                        {featuredEvent.poster ? (
                          <img src={featuredEvent.poster} alt="" />
                        ) : (
                          <>
                            <ImageIcon className="text-5xl text-green-400" />
                            <span className="text-gray-500 my-2">
                              Event&apos;s Poster
                            </span>
                          </>
                        )}
                      </div>
                      <EventCard post={featuredEvent} />
                    </div>
                  )}
                  <h2 className="md:mx-8 mt-8 md:my-12 flex items-center justify-between">
                    <span className="text-3xl mr-4 text-gray-600 font-semibold my-4">
                      Open
                    </span>
                    <div className="w-[85%] md:w-[90%] h-0.5 bg-gray-200"></div>
                  </h2>
                  <ul className="flex items-center justify-evenly flex-wrap">
                    {data?.filter(
                      (e) =>
                        e.category.toLowerCase() == type.toLowerCase() &&
                        e.is_active
                    ).length == 0 && "More Events Comming Soon!"}
                    {data &&
                      data.map(
                        (post) =>
                          post.category.toLowerCase() == type.toLowerCase() &&
                          post.is_active && (
                            <EventCard key={post._id} post={post} />
                          )
                      )}
                  </ul>
                  {/* <button className="rounded-full px-12 ml-auto block py-2 shadow bg-white text-green-400 font-semibold">
                    Show More
                  </button> */}
                  {/* <h2 className="md:mx-8 mt-8 md:my-12 flex items-center justify-between">
                    <span className="mr-4 text-3xl text-gray-600 font-semibold my-4">
                      Upcoming
                    </span>
                    <div className="w-[80%] h-0.5 bg-gray-200"></div>
                  </h2>
                  <ul className="flex items-center justify-evenly flex-wrap">
                    {data.map(
                      (post) =>
                        post.type.toLowerCase() == type.toLowerCase() && (
                          <EventCard key={post.id} post={post} />
                        )
                    )}
                  </ul>
                  <button className="rounded-full px-12 ml-auto block py-2 shadow bg-white text-green-400 font-semibold">
                    Show More
                  </button> */}
                  <h2 className="md:mx-8 mt-8 md:my-12 flex items-center justify-between">
                    <span className="mr-4 text-3xl text-gray-600 font-semibold my-4">
                      Past
                    </span>
                    <div className="w-[90%] h-0.5 bg-gray-200"></div>
                  </h2>
                  <ul className="flex items-center justify-evenly flex-wrap">
                    {data?.filter(
                      (e) =>
                        e.category.toLowerCase() == type.toLowerCase() &&
                        !e.is_active
                    ).length == 0 && "More Events Comming Soon!"}
                    {data &&
                      data.map(
                        (post) =>
                          post.category.toLowerCase() == type.toLowerCase() &&
                          !post.is_active && (
                            <EventCard key={post._id} post={post} />
                          )
                      )}
                  </ul>
                  {/* <button className="rounded-full px-12 ml-auto block py-2 shadow bg-white text-green-400 font-semibold">
                    Show More
                  </button> */}
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default List;
