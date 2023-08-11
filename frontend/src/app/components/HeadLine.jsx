"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import glitch from "../../../public/assets/icons/glitch.jpeg";

const HeadLine = () => {
  const [headline, setHeadline] = useState([]);

  useEffect(() => {
    // Make the API call when the component mounts
    axios
      .get("http://127.0.0.1:8000/api/news/headline/")
      .then((response) => {
        // console.log(response.data);
        setHeadline(response.data); // Assuming the API returns an array of news items
      })
      .catch((error) => {
        console.error("Error fetching latest news:", error);
      });
  }, []);
  return (
    <section className="flex flex-col gap-3">
      <h1 className="font-bold text-5xl">{headline.title}</h1>
      {/* <h2 className="font-normal text-gray-400 text-lg">
        Subheading of headline News Title here
      </h2> */}
      <p className="text-sm text-green-400 font-bold">{headline.by}</p>
      <Image src={glitch} width={500} height={500} className="" />
    </section>
  );
};

export default HeadLine;
