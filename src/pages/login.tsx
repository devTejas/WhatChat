import Head from "next/head";
import React from "react";
import { auth, provider } from "../db/firebaseConfig";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <div className="grid place-items-center h-screen bg-black text-white">
      <Head>
        <title>Login</title>
      </Head>
      <div className="p-24 px-12 flex flex-col items-center rounded-md shadow-lg border-white border-4">
        <img src="/message-circle.svg" className="w-16" />
        <p className="font-mono">
          <span className="font-bold">WhatChat</span> - kya baat karega re tu!
        </p>
        <button
          className="mt-10 p-2 bg-red-400 text-black rounded font-bold hover:transform hover:scale-110"
          onClick={signIn}
        >
          SIGN IN WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Login;
