import React, { useContext, useState } from "react";
// Next components
import Link from "next/link";
import { useRouter } from "next/router";
// Custom Components
import Logo from "../components/Logo";
// Icons
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import SpinnerIcon from "../components/SpinnerIcon";
// App Context
import { AppContext } from "../context/AppContext";
// Toast
import { toast } from "react-toastify";
import { loginUser } from "../Services/User";

const Signin = () => {
  const router = useRouter();

  const [showPass, setShowPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      email: formData.email,
      password: formData.password,
    };

    let json = await loginUser(data);

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
      localStorage.setItem("auth-token", JSON.stringify(json.authToken));
      toast.success(`LoggedIn Successfully!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center flex-col w-full min-h-screen">
      <Logo />
      <form
        onSubmit={handleLogin}
        className="bg-white shadow mt-8 p-5 sm:p-8 w-[90%] sm:w-[75%] lg:w-1/3 rounded-2xl"
      >
        <h2 className="mb-8 text-2xl text-green-400">Welcome back !</h2>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter you email"
          className="w-full px-4 py-2 rounded-2xl mb-4 shadow-sm border outline-none"
        />
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 w-full hover:bg-yellow-200 rounded-2xl bg-gray-100 text-green-500"
        >
          {isSubmitting && <SpinnerIcon />}
          Sign In
        </button>
        <div className="mt-4 flex items-center justify-between flex-wrap">
          <Link
            href="/forgot-password"
            className="text-center mx-2 my-2 text-blue-500"
          >
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
