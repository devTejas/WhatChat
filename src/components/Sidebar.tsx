import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../db/firebaseConfig";
import * as EmailValidator from "email-validator";
import { useCollection } from "react-firebase-hooks/firestore";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [chatEmail, setChatEmail] = useState<string>("");
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user?.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    setShowInput(true);

    if (!chatEmail) return null;

    if (EmailValidator.validate(chatEmail) && chatEmail !== user?.email) {
      db.collection("chats").add({
        users: [user?.email, chatEmail],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail: string) => {
    chatsSnapshot?.docs.find((chat) =>
      chat.data().users.find((user: any) => user === recipientEmail)
    );
  };

  const cancelChat = () => {
    setChatEmail("");
    setShowInput(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-4 border-b sticky top-0 z-50">
        <div className="icon">😄</div>
        <div className="">
          <button className="icon">💬</button>
          <button
            className="ml-4 icon"
            onClick={() => {
              console.log("logout");
              auth.signOut();
            }}
          >
            <img src="/log-out.svg" alt="logout" />
          </button>
        </div>
      </div>
      <div className="">
        <span className="">🔍</span>
        <input
          className="outline-none border-none"
          type="search"
          placeholder="Search chat"
          value=""
          onChange={() => {}}
        />
      </div>
      <div className="">
        {showInput && (
          <input
            className="outline-none border-none"
            type="text"
            placeholder="Enter the email you want to chat with"
            value={chatEmail}
            onChange={(e: any) => setChatEmail(e.target.value)}
          />
        )}
        <button className="" onClick={!showInput ? createChat : cancelChat}>
          {!showInput ? "➕" : "❌"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
