import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../db/firebaseConfig";
import getRecipientEmail from "../utils/getRecipientEmail";

const Chat = ({ id, users }: ChatPropsType) => {
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );

  // our db has users & chats
  /*
    // chats b/w users
    Chats:[
       chat_id_1:{
           user_id_1:'',
           user_id_2:'',
       },
       chat_id_2:{
           user_id_1:'',
           user_id_2:'',
       }
   ]

   // users logged in
   users:[
       user_id_1,
       user_id_2,
       ...
   ]
  */
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);
  console.log(recipientSnapshot?.docs);

  return (
    <div className="flex items-center hover:bg-gray-100 cursor-pointer font-semibold break-words select-none">
      <img className="rounded-2xl w-7 bg-gray-400 m-3" src="/user.svg" alt="" />
      <p>{recipientEmail}</p>
    </div>
  );
};

export default Chat;

type ChatPropsType = { id: string; users: any };
