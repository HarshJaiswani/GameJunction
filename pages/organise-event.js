import React from "react";
import CreateEventForm from "../components/CreateEventForm";

const OrganiseEvent = () => {
  return (
    <div className="bg-gray-50 w-full min-h-screen py-8">
      <h2 className="text-2xl sm:text-3xl text-gray-500 font-semibold font-sans text-center p-5 sm:pb-8">
        Organise your Event
      </h2>
      <CreateEventForm />
    </div>
  );
};

export default OrganiseEvent;
