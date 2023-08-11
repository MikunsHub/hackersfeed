"use client";

import HeadLine from "./components/HeadLine";
import HackersFeedHottest from "./components/HackersFeedHottest";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "./components/Layout";
import Link from "next/link";
import Latest from "./components/Latest";

const LandingPage = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page number

  const loadMoreNews = () => {
    // Increment the current page number and make API call for next page
    const nextPage = currentPage + 1;
    axios
      .get(`http://127.0.0.1:8000/api/news/latest-news/?page=${nextPage}`)
      .then((response) => {
        // Concatenate the new news items to the existing list
        setLatestNews((prevNews) => [...prevNews, ...response.data.results]);
        setCurrentPage(nextPage); // Update the current page number
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  };

  useEffect(() => {
    // Make the API call when the component mounts
    axios
      .get("http://127.0.0.1:8000/api/news/latest-news")
      .then((response) => {
        // console.log(response.data.results);
        setLatestNews(response.data.results); // Assuming the API returns an array of news items
      })
      .catch((error) => {
        console.error("Error fetching latest news:", error);
      });
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-12 min-h-screen">
        <section className="flex flex-col gap-5 col-span-8">
          <div className=" grid grid-cols-12 gap-2">
            <div className="col-span-9 ">
              <HeadLine />
            </div>
            <div className="col-span-3 ">
              <HackersFeedHottest />
            </div>
          </div>

          <div className="my-9">
            <Latest latestNews={latestNews} />
            <button
              className="bg-orange-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
              onClick={loadMoreNews}
            >
              Load More
            </button>
          </div>
        </section>
        {/* third col */}
        <div className="col-span-4">
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="What's happening"
              className="block w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="ml-auto bg-orange-500 hover:bg-green-500 text-white py-2 px-4 rounded"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
