import "../styles/globals.css";
import Head from "next/head";
import AppState from "../context/AppContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AppState>
      <Head>
        <title>App&apos;s Title</title>
      </Head>
      <Component {...pageProps} />
    </AppState>
  );
};

export default MyApp;
