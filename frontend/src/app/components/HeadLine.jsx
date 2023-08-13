"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import glitch from "../../../public/assets/icons/glitch.jpeg";

const HeadLine = () => {
  const [headline, setHeadline] = useState([]);

  useEffect(() => {
    // API call when the component mounts
    axios
      .get("http://127.0.0.1:8000/api/news/headline/")
      .then((response) => {
        setHeadline(response.data); // Assuming the API returns an array of news items
      })
      .catch((error) => {
        console.error("Error fetching latest news:", error);
      });
  }, []);
  return (
    <Link href={`/${headline.id}`} passHref>
      <section className="flex flex-col gap-3">
        <h1 className="font-bold text-5xl">{headline.title}</h1>
        <p className="text-sm text-green-400 font-bold">{headline.by}</p>
        <Image src={glitch} width={500} height={500} className="" />
      </section>
    </Link>
  );
};

export default HeadLine;
