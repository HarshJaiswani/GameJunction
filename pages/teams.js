import React, { useState, useRef, useEffect } from "react";
// Icons
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoIosCreate } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import SpinnerIcon from "components/SpinnerIcon";
// swr
import useSWR from "swr";
// services
import {
  fetchAllTeamsOfUser,
  createTeam,
  fetchAllInvitations,
} from "Services/Teams";
// toast
import { toast } from "react-toastify";
// Custom Components
import TeamCard from "components/TeamCard";

const Teams = () => {
  const [teamMaker, setTeamMaker] = useState(false);
  const [teamName, setTeamName] = useState("");
  const inputRef = useRef();
  const { data, error, mutate } = useSWR("TEAMS", fetchAllTeamsOfUser);
  const {
    data: invitations,
    error: err,
    mutate: mut,
  } = useSWR("INVITATIONS", fetchAllInvitations);

  useEffect(() => {
    if (teamMaker) {
      inputRef.current.focus();
    }
  }, [teamMaker]);

  const handleTeamCreate = async (e) => {
    e.preventDefault();
    let json = await createTeam(teamName);
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
      mutate();
    }
    setTeamMaker(false);
    setTeamName("");
  };

  return (
    <div className="w-full md:w-[80%] min-h-[50vh] mx-auto p-4 sm:p-8 md:p-12">
      <div className="flex items-center justify-between pb-8">
        <h2 className="flex items-center text-gray-600 text-xl sm:text-2xl px-1">
          <HiOutlineUserGroup className="mr-4" />
          <span className="font-semibold">Teams</span>
        </h2>
        {!teamMaker && (
          <button
            onClick={() => setTeamMaker(true)}
            className="px-4 py-2 hover:bg-yellow-400/50 text-sm sm:text-base rounded-2xl flex items-center bg-white text-gray-600 shadow"
          >
            <IoIosCreate className="text-base sm:text-lg mr-2" />
            Create Team
          </button>
        )}
      </div>
      <div>
        {teamMaker && (
          <div className="w-full bg-gray-50 shadow my-8 rounded-2xl p-4">
            <form
              onSubmit={(e) => handleTeamCreate(e)}
              className="flex items-center justify-between"
            >
              <h2 className="text-gray-600 w-full md:w-1/2 flex items-center">
                <input
                  type="text"
                  ref={inputRef}
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="outline-none w-full bg-white px-4 py-2 rounded-2xl shadow-sm"
                  placeholder="Give Your Team a relevent name"
                />
              </h2>
              <div className="flex items-center">
                <button
                  type="submit"
                  className="outline-none p-1 rounded-full bg-gray-100 mx-2 shadow cursor-pointer"
                >
                  <TiTick className="text-green-400 text-2xl" />
                </button>
                <div
                  onClick={() => setTeamMaker(false)}
                  className="p-1 rounded-full bg-gray-100 mx-2 shadow cursor-pointer"
                >
                  <MdOutlineClose className="text-red-400 text-2xl" />
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      <div>
        {!data && (
          <div className="w-full flex items-center justify-center">
            <SpinnerIcon />
          </div>
        )}
        {data && (
          <>
            <h2 className="text-xl md:text-3xl mx-2 my-8 text-gray-700">
              Created Teams
            </h2>
            <div>
              {data.createdTeams?.length == 0 && (
                <div className="text-center text-gray-500 text-sm">
                  No Teams Available. Create one to participant in team events!
                </div>
              )}
              {data.createdTeams?.map((team, index) => (
                <TeamCard key={index} team={team} />
              ))}
            </div>
            <h2 className="text-xl md:text-3xl mx-2 my-8 text-gray-700">
              Teams you are member of
            </h2>
            <div>
              {data.participations?.length == 0 && (
                <div className="text-center text-gray-500 text-sm">
                  No Participated Teams Available. Which you did&#39;nt created!
                </div>
              )}
              {data.participations?.map((team, index) => (
                <TeamCard key={index} team={team} />
              ))}
            </div>
          </>
        )}
      </div>
      {invitations && (
        <div>
          <h2 className="text-xl md:text-3xl mx-2 my-8 text-gray-700">
            Invitations
          </h2>
          <div>
            {invitations?.length == 0 && (
              <div className="text-center text-gray-500 text-sm">
                No Invitations Available!
              </div>
            )}
            {invitations?.map((team, index) => (
              <TeamCard key={index} team={team} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
