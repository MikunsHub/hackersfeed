"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const HackersFeedHottest = () => {
  const [headlineHf, setHeadlineHf] = useState([]);
  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    // Make the API call when the component mounts
    axios
      .get("http://127.0.0.1:8000/api/news/headline/hf")
      .then((response) => {
        // console.log(response.data);
        setHeadlineHf(response.data); // Assuming the API returns an array of news items
      })
      .catch((error) => {
        console.error("Error fetching latest news:", error);
      });
  }, []);

  return (
    <div>
      <h2 className="font-bold text-2xl text-orange-500">
        HackersFeed Hottest
      </h2>
      <div className="border border-2gray-500 mt-5"></div>

      {headlineHf.map((headline, index) => (
        <Link href={`/${headline.id}`} passHref>
        <div key={index}>
          <h3 className="font-bold">{headline.title}</h3>
          <h4 className="hidden md:flex">{truncateText(headline.text, 15)}</h4>
          <h4 className="md:hidden">{truncateText(headline.text, 50)}</h4>
          <p>By: {headline.by}</p>
          <div className="border border-2gray-500 mt-5"></div>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default HackersFeedHottest;
