import React, { useState } from "react";
// Next components
import Link from "next/link";
// Custom Components
import Logo from "../components/Logo";
// Icons
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";

const Signin = () => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="bg-gray-50 flex items-center justify-center flex-col w-full min-h-screen">
      <Logo />
      <form className="bg-white shadow mt-8 p-8 w-1/3 rounded-2xl">
        <h2 className="mb-8 text-2xl text-green-400">Welcome back !</h2>
        <input
          type="email"
          placeholder="Enter you email"
          className="w-full px-4 py-2 rounded-2xl mb-4 shadow-sm border outline-none"
        />
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-2xl mb-4 shadow-sm border outline-none"
          />
          <div className="absolute top-3 right-3">
            {showPass && (
              <AiOutlineEye
                className="text-lg text-gray-300 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              />
            )}
            {!showPass && (
              <AiOutlineEyeInvisible
                className="text-lg text-gray-300 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              />
            )}
          </div>
        </div>
        <div className="flex items-center justify-evenly w-full mt-4">
          <button className="px-4 py-2 w-1/2 mr-4 hover:bg-yellow-200 rounded-2xl bg-gray-100 text-gray-500">
            Forgot password ?
          </button>
          <button className="px-4 py-2 w-1/2 ml-4 hover:bg-yellow-200 rounded-2xl bg-gray-100 text-green-500">
            Sign In
          </button>
        </div>
        <Link
          href="/signup"
          className="inline-block mt-8 w-full text-center text-blue-500"
        >
          Don&apos;t have an account ?
        </Link>
      </form>
    </div>
  );
};

export default Signin;
