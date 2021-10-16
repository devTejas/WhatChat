import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../db/firebaseConfig";

const Message = ({ user, message }: any) => {
  const [userLoggedIn] = useAuthState(auth);

  const Sender = ({ message }: any) => (
    <p className="w-max rounded-md m-2 pb-6 ml-auto text-right p-4 bg-green-100">
      {message}
    </p>
  );
  const Receiver = ({ message }: any) => (
    <p className="w-max rounded-md m-2 pb-6 ml-auto text-left p-4 bg-gray-300">
      {message}
    </p>
  );

  return (
    <div className="">
      <div className="">
        {user === userLoggedIn?.email ? (
          <Sender message={message.message} />
        ) : (
          <Receiver message={message.message} />
        )}
      </div>
    </div>
  );
};

export default Message;
