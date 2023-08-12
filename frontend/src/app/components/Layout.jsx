import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import open from "../../../public/assets/icons/hamburger-icon.svg";
import siteLogo from "../../../public/assets/icons/site_logo.svg";
import Image from "next/image";
import close from "../../../public/assets/icons/closeorange-icon.svg";
import Link from "next/link";


export const Layout = ({ children, latestNews }) => {
  const [openNav, setOpenNav] = useState(false);

  const toggleNav = () => {

    setOpenNav(!openNav);
  };

  return (
    <div>
      <div className="w-full flex justify-between md:hidden h-auto">
        <div className="logo p-5">
          <Link href="/">
          <Image
            width={50}
            height={50}
            src={siteLogo.src}
            alt="Site Logo"
            className="logo-image"
          />
          </Link>
        </div>

        <button className="md:hidden" onClick={toggleNav}>
          {openNav ? <Image src={close} className="w-6 h-6 mt-1 cursor-pointer" /> : <Image src={open} className="w-6 h-6 mt-1 cursor-pointer" />}
        </button>
      </div>

      <div className={`gap-0 md:w-full  flex h-full ${openNav ? "" : ""}`}>
        <div className={`sticky md:w-[40%] h-full top-0 ${openNav ? "" : "hidden md:block h-[100vh] "}`}>
          <Sidebar latestNews={latestNews} />
        </div>
        <div className={` ${openNav ? "hidden h-[100vh]" : " "}`}>{children}</div>
      </div>
    </div>
  );
};
