import "../styles/globals.css";
// Next Components
import Head from "next/head";
import { useRouter } from "next/router";
// Custom Components
import Navbar from "../components/Navbar";
// Context
import AppState from "../context/AppContext";

const MyApp = ({ Component, pageProps }) => {
  const noNavRoutes = ["/signin", "/signup"];
  const router = useRouter();
  return (
    <AppState>
      <Head>
        <title>GameJunction</title>
        {/* Come let's play */}
      </Head>
      {!noNavRoutes.includes(router.pathname) && <Navbar />}
      <Component {...pageProps} />
    </AppState>
  );
};

export default MyApp;
