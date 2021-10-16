import React from "react";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { auth, db } from "../../db/firebaseConfig";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";

const Chat = ({ chat, messages }: { chat: any; messages: any }) => {
  const [user] = useAuthState(auth);
  return (
    <div className="flex">
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <div className="flex-1 h-screen overflow-scroll scrollbar-none">
        <ChatScreen chat={chat} messages={messages} />
      </div>
    </div>
  );
};

export default Chat;

export async function getServerSideProps(context: any) {
  const ref = db.collection("chats").doc(context.query.id);

  //   PREP the messages on the server
  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages: any) => ({
      ...messages,
      timestamp: messages?.timestamp.toDate().getTime(),
    }));

  // PREP the chats
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
