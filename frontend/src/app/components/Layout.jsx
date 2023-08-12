import React, { Children } from "react";
import Sidebar from "../components/SideBar";

export const Layout = ({ children,latestNews }) => {
  return (
    <div className=" gap-0 flex h-full">
      <div className="sticky h-full  top-0">
        {" "}
        <Sidebar latestNews={latestNews} />{" "}
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
};
