import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../db/firebaseConfig";
import Message from "./Message";
import firebase from "firebase";
import getRecipientEmail from "../utils/getRecipientEmail";

const ChatScreen = ({ chat, messages }: any) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(`${router.query?.id}`)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data()?.user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message: any) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const [input, setInput] = useState<string>("");

  const sendMessage = (e: any) => {
    e.preventDefault();

    db.collection("users").doc(user?.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats")
      .doc(`${router.query.id}`)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user?.email,
        photoURL: user?.photoURL,
      });

    setInput("");
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <div className="">
      <div className="sticky bg-white z-50 top-0 flex p-3 h-20 items-center">
        <img
          className="rounded-2xl w-7 bg-gray-400 m-3"
          src={recipient?.photoURL ?? "/user.svg"}
          alt=""
        />
        <div className="ml-4 flex-1">
          <h3 className="font-bold">{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p className="text-sm">
              Last Active: {recipient?.lastSeen?.toDate().getTime()}
            </p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="p-7 bg-gray-200 min-h-screen">
        {showMessages()}
        <div className="">{/* EndofMessagesDiv */}</div>
      </div>
      <form className="flex items-center p-3 sticky bottom-0 bg-white z-50">
        🙂
        <input
          type="text"
          className="flex-1 outline-0 border-0 rounded-lg bg-gray-100 p-3 mx-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          hidden
          disabled={!input}
          type="submit"
          onClick={sendMessage}
        ></button>
      </form>
    </div>
  );
};

export default ChatScreen;
