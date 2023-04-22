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
        <meta
          name="description"
          content="GameJunction and is a web application that connects sports enthusiasts with tournaments and events in their local area."
        />
        <noscript>
          Give Power of Javascript to Your Browser Engine to Have Embrase the
          Beauty of this App
        </noscript>
        <title>GameJunction</title>
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
