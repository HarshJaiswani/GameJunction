import React, { useState, useRef, useEffect } from "react";
// icons
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { IoPencil } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
// services
import {
  updateTeam,
  deleteTeam,
  addTeamMember,
  updateInvite,
} from "Services/Teams";
// Toast
import { toast } from "react-toastify";
// swr
import { mutate } from "swr";
// hooks
import useUser from "hooks/useUser";
import SpinnerIcon from "./SpinnerIcon";

const TeamCard = ({ team }) => {
  const [editedName, setEditedName] = useState("");
  const [editTeamName, setEditTeamName] = useState(false);
  const [inviteeInput, setInviteeInput] = useState("");
  const [isTeamLeader, setIsTeamLeader] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef();
  const { user } = useUser();

  useEffect(() => {
    if (editTeamName) {
      inputRef.current.focus();
    }
  }, [inputRef, editTeamName]);

  useEffect(() => {
    if (
      team.participants.filter((e) => e.participant_id == user.email)[0]
        ?.is_leader
    ) {
      setIsTeamLeader(true);
    } else {
      setIsTeamLeader(false);
    }
  }, [team, user]);

  const handleTeamNameChange = async (team_id) => {
    setIsSubmitting(true);
    if (editedName == "") {
      toast.error(`Team name cannot be empty!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsSubmitting(false);
      return;
    }
    const data = {
      team_id,
      team_name: editedName,
    };
    let json = await updateTeam(data);
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
      mutate("TEAMS");
    }
    setEditTeamName(false);
    setEditedName("");
    setIsSubmitting(false);
  };

  const handleDeleteTeam = async (team_id) => {
    setIsSubmitting(true);
    let json = await deleteTeam(team_id);
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
      mutate("TEAMS");
    }
    setIsSubmitting(false);
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = {
      team_id: team._id,
      participant_id: inviteeInput,
    };
    let json = await addTeamMember(data);
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
      mutate("TEAMS");
    }
    setInviteeInput("");
    setIsSubmitting(false);
  };

  const acceptInvite = async () => {
    setIsSubmitting(true);
    let data = {
      invite_accepted: true,
      team_id: team._id,
    };
    let json = await updateInvite(data);
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
      mutate("TEAMS");
      mutate("INVITATIONS");
    }
    setIsSubmitting(false);
  };

  const rejectInvite = async () => {
    setIsSubmitting(true);
    let data = {
      invite_rejected: true,
      team_id: team._id,
    };
    let json = await updateInvite(data);
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
      mutate("TEAMS");
      mutate("INVITATIONS");
    }
    setIsSubmitting(false);
  };

  const makeLeader = async (id) => {
    setIsSubmitting(true);
    let data = {
      make_leader: id,
      team_id: team._id,
    };
    let json = await updateInvite(data);
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
      mutate("TEAMS");
      mutate("INVITATIONS");
    }
    setIsSubmitting(false);
  };

  const removeMember = async (id) => {
    setIsSubmitting(true);
    let data = {
      remove_member: id,
      team_id: team._id,
    };
    let json = await updateInvite(data);
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
      mutate("TEAMS");
      mutate("INVITATIONS");
    }
    setIsSubmitting(false);
  };

  const leaveTeam = async () => {
    setIsSubmitting(true);
    let data = {
      leave_team: true,
      team_id: team._id,
    };
    let json = await updateInvite(data);
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
      mutate("TEAMS");
      mutate("INVITATIONS");
    }
    setIsSubmitting(false);
  };

  return (
    <>
      {user && (
        <div className="w-full bg-gray-50 shadow my-8 rounded-2xl p-4">
          {isSubmitting && (
            <>
              <div className="w-full opacity-flicker my-4 h-[20px] bg-gray-200 rounded-full"></div>
              <div className="w-full opacity-flicker my-4 h-[20px] bg-gray-200 rounded-full"></div>
              <div className="w-full opacity-flicker my-4 h-[20px] bg-gray-200 rounded-full"></div>
            </>
          )}
          {!isSubmitting && (
            <>
              <div className="flex flex-col md:flex-row items-center justify-between border-b pb-2 px-2">
                <>
                  {!editTeamName && (
                    <h2 className="text-lg text-teal-600 font-semibold tracking-wide">
                      {team.team_name}
                    </h2>
                  )}
                  {editTeamName && (
                    <h2 className="text-gray-600 w-[80%] md:w-1/2 flex items-center">
                      <input
                        type="text"
                        required={true}
                        ref={inputRef}
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="outline-none w-full bg-white px-4 py-2 rounded-2xl shadow-sm"
                        placeholder="Update Your Team Name"
                      />
                    </h2>
                  )}
                </>
                <div className="my-4 md:my-0 flex items-center">
                  <p className="font-semibold drop-shadow-sm text-sm tracking-wider text-gray-400 rounded-md">
                    <span className="text-yellow-400 text-xl">
                      {team.participants.filter((e) => !e.is_deleted).length}
                    </span>{" "}
                    Member(s)
                  </p>
                  {user.email == team.created_by && (
                    <>
                      {isTeamLeader && !editTeamName && (
                        <div
                          onClick={() => {
                            setEditTeamName(true);
                            setEditedName(team.team_name);
                          }}
                          className="p-1.5 rounded-full bg-gray-100 mx-2 shadow cursor-pointer"
                        >
                          <IoPencil className="text-teal-500 text-lg" />
                        </div>
                      )}
                      {editTeamName && (
                        <div
                          onClick={() => handleTeamNameChange(team._id)}
                          className="p-1 rounded-full bg-gray-100 mx-2 shadow cursor-pointer"
                        >
                          <TiTick className="text-green-400 text-2xl" />
                        </div>
                      )}
                      {isTeamLeader && (
                        <div
                          onClick={() => handleDeleteTeam(team._id)}
                          className="p-1.5 rounded-full bg-gray-100 mx-2 shadow cursor-pointer"
                        >
                          <AiFillDelete className="text-red-400 text-xl" />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              {isTeamLeader && (
                <div className="border-b">
                  <h2 className="mt-4 px-2 font-semibold text-gray-400">
                    Add Member
                  </h2>
                  <form
                    onSubmit={(e) => handleInvite(e)}
                    className="flex items-center mt-2 mb-4"
                  >
                    <input
                      type="email"
                      required={true}
                      value={inviteeInput}
                      onChange={(e) => setInviteeInput(e.target.value)}
                      placeholder="Enter Email of Invitee"
                      className="outline-none w-full md:w-1/2 px-4 py-2 rounded-2xl bg-white shadow"
                    />
                    <button
                      type="submit"
                      className="rounded-full p-2 bg-yellow-100 flex items-center justify-center text-gray-600 outline-none mx-4"
                    >
                      <AiOutlinePlus />
                    </button>
                  </form>
                </div>
              )}
              <div className="px-2">
                {team.participants.map((mate, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between flex-wrap my-2"
                  >
                    <p>{mate.participant_id}</p>
                    <div className="flex items-center flex-wrap justify-evenly text-sm sm:text-base my-2">
                      {mate.participant_id != user.email && !mate.is_leader && (
                        <div className="mr-2 text-gray-400 bg-gray-100 px-4 py-1 rounded-md">
                          Invite:{" "}
                          {mate.invite_rejected && (
                            <span className="text-red-400">rejected</span>
                          )}
                          {mate.invite_accepted && (
                            <span className="text-green-400">Accepted</span>
                          )}
                          {!mate.invite_accepted && (
                            <span className="text-cyan-400">Pending</span>
                          )}
                        </div>
                      )}
                      {mate.is_leader && (
                        <div className="mr-2 text-orange-400 bg-gray-100 px-4 py-1 rounded-md">
                          Leader
                        </div>
                      )}
                      {mate.participant_id == team.created_by && (
                        <div className="mr-2 text-blue-400 bg-gray-100 px-4 py-1 rounded-md">
                          Creator
                        </div>
                      )}
                      {mate.participant_id == user.email &&
                        !mate.invite_accepted &&
                        !mate.invite_rejected && (
                          <button
                            onClick={acceptInvite}
                            className="mr-2 outline-none cursor-pointer whitespace-nowrap text-green-400 underline bg-gray-100 px-4 py-1 rounded-md"
                          >
                            Accept Invite
                          </button>
                        )}
                      {mate.participant_id == user.email &&
                        !mate.invite_accepted &&
                        !mate.invite_rejected && (
                          <button
                            onClick={rejectInvite}
                            className="mr-2 outline-none cursor-pointer whitespace-nowrap text-red-400 underline bg-gray-100 px-4 py-1 rounded-md"
                          >
                            Reject Invite
                          </button>
                        )}
                      {!mate.is_leader &&
                        mate.invite_accepted &&
                        mate.participant_id == user.email && (
                          <div
                            onClick={leaveTeam}
                            className="mx-2 text-pink-500 underline cursor-pointer bg-gray-100 px-4 py-1 rounded-md"
                          >
                            Leave
                          </div>
                        )}

                      {mate.invite_accepted &&
                        isTeamLeader &&
                        mate.participant_id != user.email && (
                          <div
                            onClick={() => makeLeader(mate.participant_id)}
                            className="mx-2 text-teal-400 underline my-1 whitespace-nowrap cursor-pointer bg-gray-100 px-4 py-1 rounded-md"
                          >
                            Make Leader
                          </div>
                        )}
                      {mate.invite_accepted &&
                        isTeamLeader &&
                        mate.participant_id != user.email && (
                          <div
                            onClick={() => removeMember(mate.participant_id)}
                            className="mx-2 text-pink-400 underline my-1 whitespace-nowrap cursor-pointer bg-gray-100 px-4 py-1 rounded-md"
                          >
                            Remove Member
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default TeamCard;
