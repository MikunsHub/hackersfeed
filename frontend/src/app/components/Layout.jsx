import React, { Children } from "react";
import Sidebar from "../components/SideBar";

export const Layout = ({ children }) => {
  return (
    <div className="md:grid flex md:grid-cols-12 p-3">
      <div className="col-span-2 ">
        {" "}
        <Sidebar />{" "}
      </div>
      <div className="col-span-10">{children}</div>
    </div>
  );
};
