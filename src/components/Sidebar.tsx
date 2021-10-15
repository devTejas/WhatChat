import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../db/firebaseConfig";
import * as EmailValidator from "email-validator";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "../pages/chat";
import userCheck from "../../public/user-check.svg";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [chatEmail, setChatEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user?.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = (e: any) => {
    e?.preventDefault();
    if (!chatEmail) return null;

    if (
      EmailValidator.validate(chatEmail) &&
      !chatAlreadyExists(chatEmail) &&
      chatEmail !== user?.email
    ) {
      console.log(chatEmail);
      db.collection("chats").add({
        users: [user?.email, chatEmail],
      });
    } else setError("Enter correct email");
  };

  error &&
    (() => {
      setInterval(() => setError(""), 5000); // use react-toast
      console.log(error);
    })();

  type chatAlreadyExistsType = (recipientEmail: string) => boolean;

  const chatAlreadyExists: chatAlreadyExistsType = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user: any) => user === recipientEmail)?.length >
        0
    );

  const cancelChat = () => {
    setChatEmail("");
    setShowInput(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-4 border-b sticky top-0 z-50">
        <img
          className="rounded-full w-14"
          src={user?.photoURL ?? "/user.svg"}
          alt=""
        />
        <div className="">
          <button className="icon">💬</button>
          <button className="ml-4 icon" onClick={() => auth.signOut()}>
            <img src="/log-out.svg" alt="logout" />
          </button>
        </div>
      </div>
      <div className="">
        <img src="/search.svg" alt="" />
        <input
          className="outline-none border-none"
          type="search"
          placeholder="Search chat"
          value=""
          onChange={() => {}}
        />
      </div>
      <div className="flex">
        {showInput && (
          <form onSubmit={(e: any) => createChat(e)}>
            <input
              className="outline-none border-none"
              type="email"
              placeholder="Enter Email to Chat"
              value={chatEmail}
              onChange={(e: any) => setChatEmail(e.target.value)}
              required
            />
            <button type="submit">
              <img src="/user-check.svg" alt="" />
            </button>
          </form>
        )}
        <button
          className=""
          onClick={!showInput ? () => setShowInput(true) : cancelChat}
        >
          {!showInput ? (
            <img src="/user-plus.svg" alt="" />
          ) : (
            <img src="/user-x.svg" alt="" />
          )}
        </button>
      </div>
      {error && <span className="">{error}</span>}
      {chatsSnapshot?.docs?.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </div>
  );
};

export default Sidebar;
