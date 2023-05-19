import React, { useEffect, useState } from "react";
// Next Components
import Link from "next/link";
// Custom Components
import Navbar from "../Navbar";
import Footer from "../Footer";
import DataTable from "./DataTable";
// import PieChart from "../Chart/PieChart";
// Icons
import { TiTick } from "react-icons/ti";
// services
import { getAllAdminGames } from "../../Services/Games";
import { getAllEnquires, resolveEnquiry } from "../../Services/Contact";
import { getAllUsers } from "../../Services/User";
// swr
import useSWR from "swr";
// hooks
import useUser from "../../hooks/useUser";
// helper
import ShowToast from "helper/ShowToast";

const AppAdmin = () => {
  const { user } = useUser();

  const [organisers, setOrganisers] = useState([]);
  const [participants, setParticipants] = useState([]);

  const {
    data: games,
    error: gameError,
    mutate,
  } = useSWR("GETALLADMINGAMES", getAllAdminGames);

  const {
    data: enquires,
    error: enqError,
    mutate: mutateEnq,
  } = useSWR("GETALLENQUIRES", getAllEnquires);

  const { data: users } = useSWR("GETALLUSERS", getAllUsers);

  useEffect(() => {
    if (users) {
      let organisers = [];
      let participants = [];
      users.forEach((e) => {
        if (e.is_organiser) {
          organisers.push(e);
        }
        if (e.is_participant) {
          participants.push(e);
        }
      });
      setOrganisers(organisers);
      setParticipants(participants);
    }
  }, [users]);

  const handleResolve = async (id) => {
    let json = await resolveEnquiry(id);
    if (json.error) {
      ShowToast(false, json.error);
    } else {
      ShowToast(true, json.success);
      mutateEnq();
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 w-full min-h-screen p-4 sm:p-12">
        {/* <div className="w-1/2">
          <PieChart />
        </div> */}
        <div className="flex items-center justify-evenly flex-wrap">
          <Link
            href={`#all_organisers`}
            className="bg-white hover:bg-green-50 cursor-pointer w-[200px] h-[100px] m-4 rounded-2xl shadow flex items-center justify-center flex-col"
          >
            <p className="text-2xl font-semibold text-green-400">
              {organisers?.length}
            </p>
            <p className="text-gray-400">All Organisers</p>
          </Link>
          <Link
            href={`#all_participants`}
            className="bg-white hover:bg-green-50 cursor-pointer w-[200px] h-[100px] m-4 rounded-2xl shadow flex items-center justify-center flex-col"
          >
            <p className="text-2xl font-semibold text-green-400">
              {participants?.length}
            </p>
            <p className="text-gray-400">All Participants</p>
          </Link>
          <Link
            href={`#all_games`}
            className="bg-white hover:bg-green-50 cursor-pointer w-[200px] h-[100px] m-4 rounded-2xl shadow flex items-center justify-center flex-col"
          >
            <p className="text-2xl font-semibold text-green-400">
              {games?.length}
            </p>
            <p className="text-gray-400">All Game</p>
          </Link>
          <Link
            href={`#all_enquires`}
            className="bg-white hover:bg-green-50 cursor-pointer w-[200px] h-[100px] m-4 rounded-2xl shadow flex items-center justify-center flex-col"
          >
            <p className="text-2xl font-semibold text-green-400">
              {enquires?.length}
            </p>
            <p className="text-gray-400">All Enquires</p>
          </Link>
        </div>
        <h2
          id="all_organisers"
          className="text-xl sm:text-2xl md:text-3xl mt-8 text-gray-600 font-semibold my-4"
        >
          All Organisers
        </h2>
        {organisers && (
          <DataTable
            data={organisers}
            dataset={["name", "contact", "email", "dob", "gender"]}
          />
        )}
        <h2
          id="all_participants"
          className="text-xl sm:text-2xl md:text-3xl mt-8 text-gray-600 font-semibold my-4"
        >
          All Participants
        </h2>
        {participants && (
          <DataTable
            data={participants}
            dataset={["name", "contact", "email", "dob", "gender"]}
          />
        )}
        <h2
          id="all_games"
          className="text-xl sm:text-2xl md:text-3xl mt-8 text-gray-600 font-semibold my-4"
        >
          All Games
        </h2>
        {games && (
          <DataTable
            dataset={["name", "playable", "resource", "is_verified"]}
            data={games}
            fetchData={mutate}
          />
        )}
        <h2
          id="all_enquires"
          className="text-xl sm:text-2xl md:text-3xl mt-8 text-gray-600 font-semibold my-4"
        >
          All Enquires
        </h2>
        <div className="flex items-center justify-start flex-wrap">
          {enquires?.length == 0 && "No Enquires!"}
          {enquires?.map((e, index) => (
            <div
              key={index}
              className="rounded-md border bg-white shadow overflow-hidden m-4 w-fit min-w-[200px]"
            >
              <div className="flex items-center justify-between px-4 py-2 bg-gray-500">
                <span className="text-white">Is Resolved</span>
                <TiTick
                  className="p-1 text-2xl rounded-full text-green-400 bg-white cursor-pointer"
                  onClick={() => handleResolve(e._id)}
                />
              </div>
              <div className="p-5">{e.message}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AppAdmin;
