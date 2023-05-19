import React, { useContext, useState } from "react";
// Next Components
import { useRouter } from "next/router";
// Icons
import SpinnerIcon from "../components/SpinnerIcon";
import { TiTick } from "react-icons/ti";
import { TbDots } from "react-icons/tb";
// App Context
import { AppContext } from "../context/AppContext";
// services
import { changePassword } from "../Services/User";
// helper
import ShowToast from "helper/ShowToast";

const ChangePassword = () => {
  const router = useRouter();
  const { handleLogout } = useContext(AppContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPassValid, setIsPassValid] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newCPassword, setNewCPassword] = useState("");

  const handleChangePass = async (e) => {
    e.preventDefault();
    if (isPassValid == false || null) {
      ShowToast(false, "Password Incorrect!");
      return;
    }
    setIsSubmitting(true);
    if (newCPassword == newPassword) {
      const data = {
        password: oldPassword,
        cpassword: newPassword,
      };
      let json = await changePassword(data);
      if (json.error) {
        ShowToast(false, json.error);
      } else {
        handleLogout();
        router.push("/signin");
      }
    } else {
      ShowToast(false, "Passwords Don't Match");
    }
    setIsSubmitting(false);
  };

  const updatingPassValue = (e) => {
    setNewPassword(e.target.value);
    if (
      e.target.value.toLowerCase().match("^(?=.*[a-zA-Z])(?=.*[0-9])") &&
      e.target.value.length >= 6
    ) {
      setIsPassValid(true);
    } else {
      setIsPassValid(false);
    }
  };

  const inputStyle =
    "outline-none px-4 py-3 shadow bg-white rounded-2xl w-full text-gray-600 mt-4";

  return (
    <div className="w-full min-h-[60vh] bg-gray-50 flex items-center justify-center flex-col">
      <form onSubmit={handleChangePass} className="w-[90%] md:w-[70%] lg:w-1/2">
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
          onChange={(e) => updatingPassValue(e)}
        />
        <div className="mt-2 mx-2 flex items-center">
          {isPassValid == true && <TiTick className="text-xl text-green-300" />}
          {isPassValid == false && <TbDots className="text-xl text-red-300" />}
          <p className="ml-2 text-gray-400 text-sm">
            Password must contain minimum 6 <b>alpha-numeric</b> letters
          </p>
        </div>
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
