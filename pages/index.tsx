import type { NextPage } from "next";
import Head from "next/head";
import Main from "../components/Main";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Video Streaming App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Main />
      </main>
    </>
  );
};

export default Home;
