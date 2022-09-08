import "../styles/globals.css";
import React from "react";
import ReactDOM from "react-dom";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import Login from "../components/Login";
import "animate.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState();
  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      setUser(JSON.parse(window.localStorage.getItem("user") || "user"));
    }
  }, []);

  return (
    <div>
      {user ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default MyApp;
