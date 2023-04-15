import React, { useEffect, useState } from "react";
// Next Component
import { useRouter } from "next/router";
// Icons
import SpinnerIcon from "../components/SpinnerIcon";

const ForgotPassword = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  useEffect(() => {
    if (router.isReady) {
      if (router.query.token) {
        setToken(router.query.token);
      }
    }
  }, [router.isReady]);

  const handleEmailSend = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const response = await fetch("/api/login", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, sendMail: true }),
    });
    const json = await response.json();
    if (json.error) {
      alert("Err");
    } else {
      alert("email sent");
      setEmail("");
    }
    setIsSubmitting(false);
  };
  const inputStyle =
    "outline-none px-4 py-3 shadow bg-white rounded-2xl w-full text-gray-600 mt-4";
  const handleChangePass = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (password == cpassword) {
      const response = await fetch("/api/login", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: JSON.parse(JSON.stringify(token)),
          sendMail: false,
          cpassword,
        }),
      });
      const json = await response.json();
      if (json.error) {
        alert("err");
      } else {
        router.push("/signin");
      }
    } else {
      alert("Password dont match!");
    }
    setIsSubmitting(false);
  };
  return (
    <div className="bg-gray-50 flex items-center justify-center w-full min-h-[50vh]">
      {token == "" ? (
        <form onSubmit={handleEmailSend} className="w-full lg:w-1/2">
          <h2 className="text-xl font-semibold text-gray-500 text-center my-4">
            Forgot Password ?
          </h2>

          <input
            type="email"
            className={inputStyle}
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="my-4 px-4 py-2 w-1/2 md:w-1/3 block ml-auto hover:bg-yellow-200 rounded-2xl bg-white shadow-md text-gray-500 font-sans font-semibold"
          >
            {isSubmitting && <SpinnerIcon />}
            Verify
          </button>
        </form>
      ) : (
        <form onSubmit={handleChangePass} className="w-full lg:w-1/2">
          <h2 className="text-xl font-semibold text-gray-500 text-center my-4">
            Change Password
          </h2>

          <input
            type="password"
            className={inputStyle}
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className={inputStyle}
            placeholder="Rewrite It"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
          />
          <p className="text-red-400 mt-4">
            {password != cpassword && "Password Do Not Match!"}
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
      )}
    </div>
  );
};

export default ForgotPassword;
