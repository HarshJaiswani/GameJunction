import React, { useState } from "react";
// Next Components
import { useRouter } from "next/router";
// Headless Ui
import { Disclosure } from "@headlessui/react";
// Icons
import { BsFillArrowRightCircleFill, BsChevronDown } from "react-icons/bs";
import SpinnerIcon from "../components/SpinnerIcon";
// services
import { raiseEnquiry } from "../Services/Contact";
// hooks
import useUser from "../hooks/useUser";
// helper
import ShowToast from "helper/ShowToast";

const FAQs = [
  {
    title: "How do I register for an event on your website?",
    data: `To register for an event on our website, go to the event's page and click on the "Apply" button. You will be asked to login if not logged In then on a click you can apply for a event.`,
  },
  {
    title: "How do I know if I have been selected to participate in an event?",
    data: `Once the registration period has ended, the event organizer will review all applications and select participants based on their criteria. If you have been selected, you will receive message from the communication platforms!`,
  },
  {
    title: "Can I participate in multiple events?",
    data: `Yes, you can participate in as many events as you want, provided that you meet the eligibility criteria for each event.`,
  },
  {
    title: "How do I create an event on your website?",
    data: `To create an event on our website, simply click on the "Create Event" button in the menu and follow the prompts to provide event details, such as date, location, rules, and prizes.`,
  },
  {
    title: "How do I receive payments for event registration fees?",
    data: `You can add a QR code in your poster of the event or you can specify the method of payment for the participants \n Disclaimer: We do not take any responsibilities of the payment done by the participant or the receiving of that payment to the organiser that is totally between organiser and participant!`,
  },
  {
    title: "How can I communicate with participants?",
    data: `You can communicate with participants by providing communication platforms in the event creation.`,
  },
  {
    title: "How can I communicate with event organiser?",
    data: `You can communicate with event organiser by communication platforms given by them in the event details page.`,
  },
  {
    title: "How are participant ratings calculated?",
    data: `Participant ratings are based on various factors such as performance in events, frequency of participation, and behavior. The exact formula for calculating ratings is not disclosed to prevent any attempts at gaming the system.`,
  },
  {
    title: "How are organizer ratings calculated?",
    data: `Organizer ratings are based on various factors such as the quality of events, participant feedback, and timeliness. The exact formula for calculating ratings is not disclosed to prevent any attempts at gaming the system.`,
  },
];

const Contact = () => {
  const router = useRouter();
  const { user } = useUser();

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitQuery = async (e) => {
    e.preventDefault();
    if (user) {
      setIsSubmitting(true);
      let json = await raiseEnquiry(message);
      if (json.error) {
        ShowToast(false, json.error);
      } else {
        ShowToast(true, json.success);
      }
      setIsSubmitting(false);
      setMessage("");
    } else {
      router.push("/signin");
    }
  };

  return (
    <div className="bg-gray-50 w-full min-h-screen">
      <div className="w-[90%] sm:w-4/5 mx-auto">
        <h2 className="flex items-center justify-between">
          <span className="w-full sm:text-left text-center text-2xl md:text-3xl mr-4 text-gray-600 font-semibold my-4">
            Contact Us
          </span>
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
        <form onSubmit={submitQuery}>
          <textarea
            name="messgae"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="outline-none px-4 py-3 shadow bg-white rounded-2xl w-full text-gray-600 mt-4 resize-none min-h-[200px]"
            placeholder="Let us know your thoughts!"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="font-sans font-semibold hover:bg-yellow-200 flex items-center w-fit ml-auto px-4 py-2 text-center rounded-full my-4 bg-white shadow text-gray-500"
          >
            {isSubmitting && <SpinnerIcon />}
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
        <div className="py-4 w-full min-h-[50vh]">
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
                  <Disclosure.Panel className="px-4 pb-4 text-sm text-gray-500">
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
