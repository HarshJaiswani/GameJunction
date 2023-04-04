import React from "react";
// Custom Components
import Logo from "../components/Logo";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  return (
    <div className="p-5 sm:p-12 bg-gray-50 w-full min-h-screen flex items-center justify-center flex-col">
      <Logo />
      <h2 className="text-2xl my-6 text-gray-600">
        <span className="text-yellow-400">Welcome</span> , It&apos;s really nice
        to see you here!
      </h2>
      <SignupForm />
    </div>
  );
};

export default Signup;
