import React, { useState } from "react";

const Loading = () => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="">
        <img src="/message-circle.svg" alt="" className="w-16 mb-3" />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
