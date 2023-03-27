import React from "react";
// Next Components
import Link from "next/link";
// Headless Ui
import { Tab } from "@headlessui/react";
// Icons
import { TiArrowForwardOutline } from "react-icons/ti";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const List = () => {
  const types = ["PSport", "ESport"];
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
    type: "psport",
    sport: "Cricket",
    location: null,
    platform: "Dream11",
    price: "price will be displyed here",
    registrationFee: null,
    eligibility: "if any eligibility will be show here",
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
                <ul className="w-4/5 mx-auto flex items-center justify-evenly flex-wrap">
                  {data.map(
                    (post) =>
                      post.type.toLowerCase() == type.toLowerCase() && (
                        <li
                          key={post.id}
                          className="w-[45%] m-4 cursor-pointer rounded-2xl ring-2 ring-gray-100 bg-white hover:ring-teal-200"
                        >
                          <Link href={`/events/${post.id}`}>
                            <div className="p-4 flex items-center justify-between">
                              <div className="">
                                <h3 className="text-lg font-semibold font-sans nunito-font">
                                  {post.title.toUpperCase()}
                                </h3>
                                <div className="flex items-center">
                                  <span className="text-gray-300 mr-2">by</span>
                                  <span className="text-yellow-400 text-sm font-semibold">
                                    {post.organiser.toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              <div className="p-2 rounded-full bg-gray-100/60 hover:ring-2 hover:ring-teal-200 shadow w-fit">
                                <TiArrowForwardOutline className="text-blue-400 text-2xl" />
                              </div>
                            </div>
                            <div className="bg-gray-50/50 p-4">
                              {post.shortDescp}
                            </div>
                            <div className="mb-4 p-4 flex items-center justify-start flex-wrap">
                              <div className="px-4 py-2 rounded-xl bg-gray-100 tracking-wider m-2">
                                {post.sport}
                              </div>
                              <div className="px-4 py-2 rounded-xl bg-gray-100 tracking-wider m-2">
                                {post.mode}
                              </div>
                              <div className="px-4 py-2 rounded-xl bg-gray-100 tracking-wider m-2">
                                {post.platform || post.location}
                              </div>
                            </div>
                            <div className="p-4 flex items-center justify-between">
                              <div className="flex items-start justify-start flex-col">
                                <span className="text-gray-500 mr-2">
                                  Registration Fee:{" "}
                                </span>
                                <span className="text-teal-400 font-sans font-semibold">
                                  Rs. {post.registrationFee || "0"}
                                </span>
                              </div>
                              <button className="ml-auto hover:bg-blue-400 block px-4 py-2.5 rounded-lg bg-blue-500 text-white">
                                Apply Now
                              </button>
                            </div>
                          </Link>
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
