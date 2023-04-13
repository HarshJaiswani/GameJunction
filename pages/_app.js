import react, { useState, useEffect } from "react";
import "../styles/globals.css";
// Next Components
import Head from "next/head";
import { useRouter } from "next/router";
import Router from "next/router";
// Custom Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
// Context
import AppState from "../context/AppContext";
// React Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyApp = ({ Component, pageProps }) => {
  const noNavRoutes = ["/signin", "/signup", "/admin", "/congrats"];
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setLoading(true);
    });
    Router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
  });
  return (
    <AppState>
      <Head>
        <title>GameJunction</title>
        {/* Come let's play */}
      </Head>
      {loading && <Loading />}
      {!loading && (
        <>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {!noNavRoutes.includes(router.pathname) && <Navbar />}
          <Component {...pageProps} />
          {!noNavRoutes.includes(router.pathname) && <Footer />}
        </>
      )}
    </AppState>
  );
};

export default MyApp;
