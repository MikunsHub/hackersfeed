import { useState } from "react";
import { useRouter } from "next/navigation";
import searchIcon from "../../../public/assets/icons/search_icon.svg";
import siteLogo from "../../../public/assets/icons/site_logo.svg";
import Image from "next/image";

const SideBar = ({ latestNews }) => {
  const router = useRouter();
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchText, setSearchText] = useState("");
  

  const handleSearchClick = () => {
    setShowSearchInput(true);
  };

  const handleClearSearch = () => {
    setSearchText("");
    setShowSearchInput(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (searchText.trim() !== "") {
        router.push(`/search/${encodeURIComponent(searchText)}`);
      }
    }
  };

  const handleLogoClick = () => {
    // Redirect to the home page
    router.push("/");
  };

  const handleNavigation = (route) => {
    router.push(`/${route}`);
  };

  console.log(latestNews);
  // console.log(latestNews[0].text)
  return (
    <div>
    <div className="md:w-full pr-20 w-full h-full">
      {/* {latestNews[0]} */}
      <div className="logo p-5 hidden md:flex">
        <a href="/" onClick={handleLogoClick}>
          <Image
            width={50}
            height={50}
            src={siteLogo.src}
            alt="Site Logo"
            className="logo-image"
          />
        </a>
      </div>

      <div className="flex justify-center items-center w-full ">
        <div className="ml-3 w-full md:w-[80%] mt-3 flex flex-col gap-3 font-extralight text-gray-400 text-lg">
          <div>
            <div className="login-btn">
              <button>Login</button>
            </div>
            <div className="relative">
              {showSearchInput ? (
                <div className="relative">
                  <button
                    className="absolute top-0 right-0 mt-2 mr-2"
                    onClick={handleClearSearch}
                  >
                    x
                  </button>
                  <input
                    type="text"
                    placeholder="Search HackersFeed"
                    className="w-full p-2 border rounded"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
              ) : (
                <div className="search-btn my-3">
                  <button className="mr-2" onClick={handleSearchClick}>
                    Search
                  </button>
                  <img
                    src={searchIcon.src}
                    alt="Search Icon"
                    className="w-5 h-5 inline-block"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="mt-3   w-full flex flex-col gap-3 ">
            <div className="text-left">
              <button onClick={() => handleNavigation("/")}>Latest</button>
            </div>
            <div className="text-left w-full">
              <button onClick={() => handleNavigation("hackersfeed")}>Hackers Feed</button>
            </div>
            <div className="text-left w-full">
              <button onClick={() => handleNavigation("jobs")}>Job Postings</button>
            </div>
            <div className="text-left">
              <button onClick={() => handleNavigation("stories")}>Stories</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SideBar;
