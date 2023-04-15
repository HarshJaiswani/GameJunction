import React, { useContext, useState } from "react";
// Next Components
import { useRouter } from "next/router";
// Icons
import SpinnerIcon from "../components/SpinnerIcon";
// App Context
import { AppContext } from "../context/AppContext";

const ChangePassword = () => {
  const router = useRouter();
  const { handleLogout } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newCPassword, setNewCPassword] = useState("");
  const handleChangePass = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (newCPassword == newPassword) {
      const data = {
        password: oldPassword,
        cpassword: newPassword,
      };
      const response = await fetch("/api/changepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": JSON.parse(localStorage.getItem("auth-token")),
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (json.error) {
        alert(json.error);
      } else {
        handleLogout();
        router.push("/signin");
      }
    } else {
      alert("password dont match");
    }
    setIsSubmitting(false);
  };
  const inputStyle =
    "outline-none px-4 py-3 shadow bg-white rounded-2xl w-full text-gray-600 mt-4";
  return (
    <div className="w-full min-h-[60vh] bg-gray-50 flex items-center justify-center flex-col">
      <form onSubmit={handleChangePass} className="w-full lg:w-1/2">
        <h2 className="text-xl font-semibold text-gray-500 text-center my-4">
          Change Password
        </h2>

        <input
          type="password"
          className={inputStyle}
          placeholder="Enter your old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          className={inputStyle}
          placeholder="Choose a password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          className={inputStyle}
          placeholder="Rewrite It"
          value={newCPassword}
          onChange={(e) => setNewCPassword(e.target.value)}
        />
        <p className="text-red-400 mt-4">
          {newPassword != newCPassword && "Password Do Not Match!"}
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="my-4 px-4 py-2 w-1/2 md:w-1/3 block ml-auto hover:bg-yellow-200 rounded-2xl bg-white shadow-md text-gray-500 font-sans font-semibold"
        >
          {isSubmitting && <SpinnerIcon />}
          Save
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;