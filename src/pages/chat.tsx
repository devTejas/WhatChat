import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../db/firebaseConfig";
import getRecipientEmail from "../utils/getRecipientEmail";

const Chat = ({ id, users }: ChatPropsType) => {
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user);

  return (
    <div className="flex items-center hover:bg-gray-100 cursor-pointer font-semibold break-words select-none">
      <img className="rounded-2xl w-7 bg-gray-400 m-3" src="/user.svg" alt="" />
      <p>{recipientEmail}</p>
    </div>
  );
};

export default Chat;

type ChatPropsType = { id: string; users: any };
