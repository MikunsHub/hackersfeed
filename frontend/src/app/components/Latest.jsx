"use client";

import Image from "next/image";
import glitch from "../../../public/assets/icons/glitch.jpeg";
// import Link from "next/link";
const Latest = ({ latestNews }) => {
  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <div className="w-full">
      <div className="border border-1-gray-500"></div>
      <div className="flex flex-col gap-3 text-black text-[48px] mt-5">
        {latestNews.map((newsItem, index) => (
          <div>
            <div className="grid grid-cols-12 mt-3 gap-5">
              <div className="col-span-4 flex flex-col gap-3" key={index}>
                <p className="text-sm font-light text-green-500">
                  {newsItem.item_type}
                </p>
                <h1 className="text-2xl font-bold">{newsItem.title}</h1>
                <h1 className="text-sm text-green-400 font-bold">
                  {newsItem.by}
                </h1>
                <h1 className="text-sm text-gray-400 font-bold">
                  {newsItem.time}
                </h1>
              </div>
              <div className="col-span-4">
                <h1 className="text-[15px] font-light text-gray-400">
                  {truncateText(newsItem.text, 150)}
                </h1>
              </div>
              <div className="col-span-4">
                <Image src={glitch} width={100} height={100} className="" />
              </div>
            </div>
            {/* <Link href={`/${newsItem.id}`} passHref>
              Read more
            </Link> */}

            <div className="border border-2gray-500 mt-5"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Latest;
