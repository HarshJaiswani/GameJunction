import React, { useEffect, useState } from "react";
// Next Components
import { useRouter } from "next/router";
import Link from "next/link";
// Custom Components
import Logo from "../components/Logo";
import SignupForm from "../components/SignupForm";
// Toast
import { toast } from "react-toastify";

const Signup = () => {
  const router = useRouter();

  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (router.isReady && router.query.isEdit) {
      setIsEdit(true);
      fetchUser();
    }
  }, [router.isReady]);

  const fetchUser = async () => {
    const token = JSON.parse(localStorage.getItem("auth-token"));
    const response = await fetch("/api/getusers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ token }),
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
      setUser(json.user);
    }
  };

  return (
    <div className="p-5 sm:p-12 bg-gray-50 w-full min-h-screen flex items-center justify-center flex-col">
      <Logo />
      {!isEdit && (
        <h2 className="text-2xl my-6 text-gray-600">
          <span className="text-yellow-400">Welcome</span> , It&apos;s really
          nice to see you here!
        </h2>
      )}
      {isEdit && (
        <h2 className="text-2xl my-6 text-gray-600">Update Profile</h2>
      )}
      {isEdit && (
        <Link
          href="/change-password"
          className="sm:absolute top-4 right-4 px-6 py-2 bg-blue-400 hover:bg-blue-300 text-white rounded-md shadow"
        >
          Change Password
        </Link>
      )}
      {!isEdit && <SignupForm />}
      {isEdit && user && <SignupForm data={user} />}
    </div>
  );
};

export default Signup;
