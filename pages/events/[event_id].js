import React from "react";
// Next Components
import { useRouter } from "next/router";

const EventId = () => {
  const { query } = useRouter();
  return <div>EventId - {query.event_id}</div>;
};

export default EventId;
