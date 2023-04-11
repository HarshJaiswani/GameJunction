import React from "react";
// Next Components
// Headless Ui
import { Tab } from "@headlessui/react";
// Icons
import { CiImageOn } from "react-icons/ci";
// Custom Components
import EventCard from "../components/EventCard";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const List = () => {
  const types = ["Sport", "ESport"];
  const data = Array(5).fill({
    id: 5,
    title: "Event name",
    shortDescp:
      "jkncjsn kcjnjks ncjknsj kncksnc nsnjc ndcdjk ndjwnkdnm ksncjn slndcldn lkwnml cnrh nlmc kammk dcs",
    longDescp:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo vero quia quae dolorem sapiente alias harum consectetur iure adipisci non voluptatibus nulla, inventore, dicta laboriosam. Hic numquam eum accusantium velit asperiores libero voluptate laboriosam, tenetur, aut corrupti voluptatum dolor esse atque eos! Dolorum voluptate eos incidunt exercitationem ad temporibus sint consectetur earum?",
    mode: "online",
    date: "",
    timing: "",
    organiser: "harsh jaiswani",
    type: "sport",
    sport: "Cricket",
    location: null,
    platform: "Dream11",
    rewards: "price will be displyed here",
    registrationFee: null,
    isActive: true,
    eligibility: "if any eligibility will be show here",
    isClosed: "",
    isDeleted: "",
    winner: "",
    isFeatured: "",
  });
  return (
    <div>
      <div className="w-full mx-auto bg-gray-50 pt-8">
        <Tab.Group>
          <Tab.List className="flex w-[80%] sm:w-[60%] md:w-1/2 lg:w-1/3 mx-auto space-x-1 rounded px-2 bg-[gray]/10 p-1">
            {types.map((type, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded py-2.5 font-sans font-semibold outline-none leading-5 text-gray-500",
                    selected
                      ? "bg-white shadow"
                      : "text-gray-500 hover:bg-[gray]/20"
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
                className={classNames("rounded-xl p-5 w-full min-h-[75vh]")}
              >
                <div className="w-full lg:w-4/5 mx-auto">
                  <div className="md:flex items-center justify-evenly">
                    <div className="w-full md:w-[45%] h-[350px] my-8 cursor-pointer flex flex-col items-center justify-center rounded-2xl bg-gray-100 shadow">
                      <CiImageOn className="text-5xl text-green-400" />
                      <span className="text-gray-500 my-2">
                        Event&apos;s Poster
                      </span>
                    </div>
                    <EventCard post={data[0]} />
                  </div>
                  <h2 className="md:mx-8 mt-8 md:my-12 flex items-center justify-between">
                    <span className="text-3xl mr-4 text-gray-600 font-semibold my-4">
                      Open
                    </span>
                    <div className="w-[85%] md:w-[90%] h-0.5 bg-gray-200"></div>
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
                  </button>
                  <h2 className="md:mx-8 mt-8 md:my-12 flex items-center justify-between">
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
                  </button>
                  <h2 className="md:mx-8 mt-8 md:my-12 flex items-center justify-between">
                    <span className="mr-4 text-3xl text-gray-600 font-semibold my-4">
                      Past
                    </span>
                    <div className="w-[90%] h-0.5 bg-gray-200"></div>
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
                  </button>
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

/**
 * 
        <div>
          <Combobox value={selectedEvent} onChange={setSelectedEvent}>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border sm:text-sm">
                <Combobox.Input
                  className="w-full outline-none border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  displayValue={(game) => game.name}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredGames.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredGames.map((game) => (
                      <Combobox.Option
                        key={game.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-gray-600 text-white" : "text-gray-900"
                          }`
                        }
                        value={game}
                      >
                        {({ selected, active }) => (
                          <div className="flex items-center">
                            {selected && (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {game.name}
                            </span>
                            <span
                              className={`py-1 px-2 text-xs mx-4 rounded-md ${
                                active
                                  ? "bg-gray-300/20"
                                  : "bg-yellow-400 text-black"
                              }`}
                            >
                              {game.mode}
                            </span>
                          </div>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
 */

export default List;
