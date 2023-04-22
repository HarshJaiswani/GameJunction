import React, { useContext, useEffect, useState } from "react";
// Next Components
import Link from "next/link";
import { useRouter } from "next/router";
// Icons
import { TiArrowForwardOutline } from "react-icons/ti";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import SpinnerIcon from "./SpinnerIcon";
// Toast
import { toast } from "react-toastify";
// hooks
import useUser from "../hooks/useUser";
// swr
import { mutate } from "swr";
// services
import { addToWishList, applyIntoEvent } from "../Services/Events";

const EventCard = ({ post }) => {
  const router = useRouter();
  const { user } = useUser();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlisting, setWishlisting] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.events_participated.includes(post._id.toString())) {
        setIsApplied(true);
      }
      if (user.wishlist_events.includes(post._id.toString())) {
        setIsWishlisted(true);
      }
    }
  }, [user, post]);

  const handleApplyEvent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (user) {
      let json = await applyIntoEvent(post._id);
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
        toast.success(`Applied in Event!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        mutate("GETALLEVENTS");
      }
    } else {
      router.push("/signin");
    }
    setIsSubmitting(false);
  };

  const handleAddToWishList = async () => {
    if (user) {
      setWishlisting(true);
      let json = await addToWishList(post._id, isWishlisted);
      if (json.error) {
        setWishlisting(false);
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
        setWishlisting(false);
        toast.success(`${json.success}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        mutate("GETALLEVENTS");
      }
    } else {
      toast.error(`Kindly SignIn!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleEventShare = () => {
    if (navigator && window) {
      navigator.clipboard.writeText(
        `${window.location.origin}/events/${post._id}`
      );
      toast.info("Event Link Copied!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <li className="w-full md:w-[45%] my-4 cursor-pointer rounded-2xl ring-2 ring-gray-100 bg-white hover:ring-teal-200">
      <Link href={`/events/${post._id}`}>
        <div className="p-4 flex items-center justify-between">
          <div className="">
            <h3 className="text-lg font-semibold font-sans nunito-font">
              {post.title.toUpperCase()}
            </h3>
            <div className="flex items-center">
              <span className="text-gray-300 mr-2">by</span>
              <span className="text-yellow-400 text-sm font-semibold">
                {post.organiserName.toUpperCase()}
              </span>
            </div>
          </div>
          <div
            className="flex items-center"
            onClick={(e) => e.preventDefault()}
          >
            <div
              onClick={handleAddToWishList}
              className="p-2 rounded-full mx-2 bg-gray-100/60 hover:ring-2 hover:ring-teal-200 shadow w-fit"
            >
              {wishlisting && <SpinnerIcon />}
              {!wishlisting &&
                (isWishlisted ? (
                  <AiFillHeart className="text-[red] text-2xl" />
                ) : (
                  <AiOutlineHeart className="text-[gray] text-2xl" />
                ))}
            </div>
            <div
              onClick={handleEventShare}
              className="p-2 rounded-full mx-2 bg-gray-100/60 hover:ring-2 hover:ring-teal-200 shadow w-fit"
            >
              <TiArrowForwardOutline className="text-blue-400 text-2xl" />
            </div>
          </div>
        </div>
        <div className="bg-gray-50/50 p-4 flex items-center justify-between flex-wrap">
          {/* {post.shortDescp} */}
          <div className="mr-4">
            <span className="text-gray-300">Theme : </span>
            <div className="px-6 py-2 rounded-full border text-gray-400 w-fit">
              {post.theme || "No Theme"}
            </div>
          </div>
          <div className="text-gray-400 font-semibold my-4">
            <span className="text-green-500">{post.participants.length}+</span>{" "}
            Participants
          </div>
        </div>
        <div className="sm:mb-4 p-4 flex items-center justify-start flex-wrap">
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
        <div className="p-4 flex items-center justify-between sm:flex-row flex-col">
          <div className="sm:flex items-start justify-start flex-col">
            <span className="text-gray-500 mr-2">Registration Fee: </span>
            <span className="text-teal-400 font-sans font-semibold">
              Rs. {post.registrationFee || "0"}
            </span>
          </div>
          {post.is_active ? (
            <button
              onClick={handleApplyEvent}
              disabled={isSubmitting || isApplied}
              className={`my-4 sm:my-0 ml-auto block w-full sm:w-fit px-4 py-2 sm:py-2.5 rounded-lg ${
                isApplied
                  ? "bg-yellow-500 hover:bg-yellow-400"
                  : "bg-blue-500 hover:bg-blue-500"
              } text-white`}
            >
              {isSubmitting && <SpinnerIcon />}
              {isApplied ? "Applied" : "Apply Now"}
            </button>
          ) : (
            <button className="ml-auto hover:bg-yellow-400 block px-4 py-2.5 rounded-lg bg-yellow-500 text-white">
              View Details
            </button>
          )}
        </div>
      </Link>
    </li>
  );
};

export default EventCard;
