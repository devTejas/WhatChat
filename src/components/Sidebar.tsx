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
      db.collection("chats")
        .add({
          users: [user?.email, chatEmail],
        })
        .then(() => setChatEmail(""))
        .catch(() => setError("Enter correct email"));
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
    <div className="px-2 border-r w-72 h-screen overflow-y-scroll scrollbar-none overflow-">
      <div className="flex justify-between items-center py-4 border-b sticky top-0 z-50">
        <img
          className="rounded-full w-12"
          src={user?.photoURL ?? "/user.svg"}
          alt=""
        />
        <div className="float-right">
          <button className="icon">💬</button>
          <button className="ml-4 icon" onClick={() => auth.signOut()}>
            <img src="/log-out.svg" alt="logout" />
          </button>
        </div>
      </div>
      <div className="flex bg-indigo-700 p-2 rounded">
        {showInput && (
          <form
            className="flex items-center bg-indigo-700"
            onSubmit={(e: any) => createChat(e)}
          >
            <input
              className="outline-none border-none w-48 bg-indigo-700"
              type="email"
              placeholder="Enter Email to Chat"
              value={chatEmail}
              onChange={(e: any) => setChatEmail(e.target.value)}
              required
            />
            <button
              className="bg-white rounded-2xl p-1 hover:bg-green-300"
              type="submit"
            >
              <img src="/user-check.svg" alt="" />
            </button>
          </form>
        )}
        <button
          className="rounded-2xl"
          onClick={!showInput ? () => setShowInput(true) : cancelChat}
        >
          {!showInput ? (
            <p className="flex items-center text-white font-bold">
              <img
                className="bg-white rounded-2xl p-1 mr-2 hover:bg-green-300"
                src="/user-plus.svg"
                alt=""
              />
              ADD A NEW USER
            </p>
          ) : (
            <img
              className="bg-white rounded-2xl p-1 hover:bg-red-500"
              src="/user-x.svg"
              alt=""
            />
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
