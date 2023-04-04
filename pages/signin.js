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
      <form className="bg-white shadow mt-8 p-5 sm:p-8 w-[90%] sm:w-[75%] lg:w-1/3 rounded-2xl">
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
        <button className="px-4 py-2 w-full hover:bg-yellow-200 rounded-2xl bg-gray-100 text-green-500">
          Sign In
        </button>
        <div className="mt-4 flex items-center justify-between flex-wrap">
          <Link href="/signup" className="text-center mx-2 my-2 text-blue-500">
            Forgot Password ?
          </Link>
          <Link href="/signup" className="text-center mx-2 my-2 text-blue-500">
            Don&apos;t have an account ?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
