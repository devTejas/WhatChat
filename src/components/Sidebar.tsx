import React, { useState } from "react";
import { auth } from "../db/firebaseConfig";

const Sidebar = () => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [chatName, setChatName] = useState<string>("");

  const createChat = () => {
    setShowInput(true);
  };

  const cancelChat = () => {
    setChatName("");
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
            placeholder="Enter your Chat Name"
            value={chatName}
            onChange={(e: any) => setChatName(e.target.value)}
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
