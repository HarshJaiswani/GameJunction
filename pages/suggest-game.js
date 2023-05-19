import React, { useState } from "react";
// Headless Ui
import { RadioGroup } from "@headlessui/react";
// Icons
import CheckIcon from "../components/Icons/CheckIcon";
import SpinnerIcon from "../components/SpinnerIcon";
// services
import { addGame } from "../Services/Games";
// helper
import ShowToast from "helper/ShowToast";

const select = [
  {
    name: "Online",
    value: "online",
  },
  {
    name: "Offline",
    value: "offline",
  },
];

const SuggestGame = () => {
  const [selectedOption, setSelectedOption] = useState(select[0]);
  const [gameName, setGameName] = useState("");
  const [resource, setResource] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputStyle =
    "outline-none px-4 py-3 shadow bg-white rounded-2xl w-full text-gray-600 mt-4";

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      name: gameName,
      resource,
      playable: selectedOption.value,
    };
    let json = await addGame(data);
    if (json.error) {
      ShowToast(false, json.error);
    } else {
      ShowToast(true, json.success);
    }
    setGameName("");
    setResource("");
    setIsSubmitting(false);
  };

  return (
    <div className="py-4 min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-1/2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-yellow-400">
          Have a unique game in mind ?
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl font-semibold my-4 text-center text-gray-500">
          Suggest it here !
        </p>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Specify Game Name"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            className={inputStyle}
          />

          <div className={`mt-4 sm:flex items-center ${inputStyle}`}>
            <span className="mb-4 w-full sm:w-1/3 inline-block text-gray-400">
              Playable :{" "}
            </span>
            <div className="w-2/3 sm:mx-8">
              <RadioGroup value={selectedOption} onChange={setSelectedOption}>
                <div className="space-y-2">
                  {select.map((s) => (
                    <RadioGroup.Option
                      key={s.name}
                      value={s}
                      className={({ active, checked }) =>
                        `
                  ${active ? "ring-2 ring-blue-200" : ""}
                  ${checked ? "bg-gray-500" : "bg-white"}
                    relative flex cursor-pointer rounded-lg border p-2 focus:outline-none`
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
                                    checked ? "text-white" : "text-gray-500"
                                  }`}
                                >
                                  {s.name}
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
          </div>

          <input
            type="text"
            placeholder="Add a link having details of this game and its rules"
            value={resource}
            onChange={(e) => setResource(e.target.value)}
            className={inputStyle}
          />

          <p className="text-sm font-semibold my-4 text-center text-gray-500">
            <span className="text-red-400">* </span>
            <span>
              This game will be ready for use once the admin accepts it!
            </span>
          </p>
          <button
            disabled={isSubmitting}
            className="my-4 px-4 py-2 w-1/2 lg:w-1/3 block ml-auto hover:bg-yellow-200 rounded-2xl bg-white shadow-md text-gray-500 font-sans font-semibold"
          >
            {isSubmitting && <SpinnerIcon />}
            Add Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuggestGame;
