import React from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-4 border-b sticky top-0 z-50">
        <div className="icon">😄</div>
        <div className="">
          <button className="icon">💬</button>
          <button className="ml-4 icon">🍔</button>
        </div>
      </div>
      <div className="">
        <span className="icon">🔍</span>
        <input
          className="outline-none border-none"
          type="search"
          placeholder="Search chat"
          value=""
        />
      </div>
      <button className="">START A NEW CHAT</button>
    </div>
  );
};

export default Sidebar;
