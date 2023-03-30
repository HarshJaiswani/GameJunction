import React from "react";
// Headless Ui
import { Disclosure } from "@headlessui/react";
// Icons
import { BsFillArrowRightCircleFill, BsChevronDown } from "react-icons/bs";

const FAQs = [
  {
    title: "What is your refund policy?",
    data: `If you're unhappy with your purchase for any reason,email us within 90 days and we'll refund you in full, no questions asked.`,
  },
  {
    title: "What is your refund policy?",
    data: `If you're unhappy with your purchase for any reason,email us within 90 days and we'll refund you in full, no questions asked.`,
  },
  {
    title: "What is your refund policy?",
    data: `If you're unhappy with your purchase for any reason,email us within 90 days and we'll refund you in full, no questions asked.`,
  },
];

const Contact = () => {
  return (
    <div className="bg-gray-50 w-full min-h-screen">
      <div className="w-4/5 mx-auto">
        <h2 className="flex items-center justify-between">
          <span className="text-3xl text-gray-600 font-semibold my-4">
            Contact Us
          </span>
          <div className="w-[80%] h-0.5 bg-gray-200"></div>
        </h2>
        <div className="my-4 text-lg space-y-2 text-gray-500 mx-2">
          <p>
            We would be really <span className="text-yellow-500">happy </span>
            to serve you however we can !
          </p>
          <p>
            If there is anything you want to be known of or wanna{" "}
            <span className="text-green-500">query</span> about,
          </p>
          <p className="font-semibold">Feel free to ask us below !</p>
        </div>
        <form>
          <textarea
            name="messgae"
            id="message"
            className="outline-none px-4 py-3 shadow bg-white rounded-2xl w-full text-gray-600 mt-4 resize-none min-h-[200px]"
            placeholder="Let us know your thoughts!"
          />
          <button className="font-sans font-semibold hover:bg-yellow-200 flex items-center w-fit ml-auto px-4 py-2 text-center rounded-full my-4 bg-white shadow text-gray-500">
            Send
            <BsFillArrowRightCircleFill className="ml-2 text-xl" />
          </button>
        </form>
        <h2 className="flex items-center justify-between">
          <span className="text-3xl text-gray-600 font-semibold my-4">
            FAQs
          </span>
          <div className="w-[88%] h-0.5 bg-gray-200"></div>
        </h2>
        <div className="my-4 w-full min-h-[50vh]">
          {FAQs.map((faq, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full mb-4 justify-between rounded-lg bg-white shadow p-4">
                    <span>{faq.title}</span>
                    <BsChevronDown
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-green-400`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    {faq.data}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
