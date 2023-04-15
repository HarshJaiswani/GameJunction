import React, { useEffect, useState } from "react";
// Next Components
import { useRouter } from "next/router";
// Custom Components
import CreateEventForm from "../components/CreateEventForm";
// Toast
import { toast } from "react-toastify";

const OrganiseEvent = () => {
  const router = useRouter();

  const [event, setEvent] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (router.isReady && router.query.id) {
      setIsEdit(true);
      fetchEvent();
    }
  }, [router.isReady]);

  const fetchEvent = async () => {
    const response = await fetch("/api/fetchsingleevent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventid: router.query.id }),
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
      setEvent(json.event);
    }
  };

  return (
    <div className="bg-gray-50 w-full min-h-screen py-8">
      <h2 className="text-2xl sm:text-3xl text-gray-500 font-semibold font-sans text-center p-5 sm:pb-8">
        {isEdit ? "Update Event" : "Organise your Event"}
      </h2>
      {isEdit && event && <CreateEventForm data={event} />}
      {!isEdit && <CreateEventForm />}
    </div>
  );
};

export default OrganiseEvent;
