import searchIcon from "../../../public/assets/icons/search_icon.svg";
import siteLogo from "../../../public/assets/icons/site_logo.svg";
import Image from "next/image";

const SideBar = () => {
  return (
    <div>
      <div className="logo p-5">
        <Image
          width={50}
          height={50}
          src={siteLogo.src}
          alt="Site Logo"
          className="logo-image"
        />
      </div>

      <div className="flex justify-center items-center w-full ">
        <div className="w-[80%] mt-3 flex flex-col gap-3 font-extralight text-gray-400 text-lg">
          <div>
            <div className="login-btn">
              <button>Login</button>
            </div>
            <div className="search-btn my-3">
              <button className="mr-2">Search</button>
              <img
                src={searchIcon.src}
                alt="Search Icon"
                className="w-5 h-5 inline-block"
              />
            </div>
          </div>
          <div className="pt-5 flex flex-col gap-3 ">
            <div className="text-left">
              <button>Latest</button>
            </div>
            <div className="text-left">
              <button>Hackers Feed</button>
            </div>
            <div className="text-left">
              <button>Job Postings</button>
            </div>
            <div className="text-left">
              <button>Stories</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
