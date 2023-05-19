import React, { useEffect, useState } from "react";
// Next Components
import { useRouter } from "next/router";
// Custom Components
import CreateEventForm from "../components/CreateEventForm";
// service
import { getSingleEvent } from "../Services/Events";
// helper
import ShowToast from "helper/ShowToast";

const OrganiseEvent = () => {
  const router = useRouter();

  const [event, setEvent] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (router.isReady && router.query.slug) {
      setIsEdit(true);
      fetchEvent();
    }
  }, [router.isReady]);

  const fetchEvent = async () => {
    let json = await getSingleEvent(router.query.slug);
    if (json.error) {
      ShowToast(false, json.error);
    } else {
      setEvent(json.event);
    }
  };

  return (
    <div className="bg-gray-50 w-full min-h-screen py-8">
      <h2 className="text-2xl sm:text-3xl text-gray-500 font-semibold font-sans text-center p-5 sm:pb-8">
        {isEdit ? "Update Event" : "Organise your Event"}
      </h2>
      {isEdit && !event && (
        <div className="w-full min-h-[60vh] flex items-center justify-center text-3xl font-semibold text-yellow-400">
          Loading...
        </div>
      )}
      {isEdit && event && <CreateEventForm data={event} />}
      {!isEdit && <CreateEventForm />}
    </div>
  );
};

export default OrganiseEvent;
