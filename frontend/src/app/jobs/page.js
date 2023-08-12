"use client";

import HeadLine from "../components/HeadLine";
import HackersFeedHottest from "../components/HackersFeedHottest";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "../components/Layout";
import Link from "next/link";
import Latest from "../components/Latest";
import { generateRandomBy } from "../utilities/helpers"; 

const JobsPage = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newStoryText, setNewStoryText] = useState(""); // State for new story text
  const [newStoryTitle, setNewStoryTitle] = useState(""); // State for new story title
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreNews = () => {
    // Increment the current page number and make API call for next page
    const nextPage = currentPage + 1;
    axios
      .get(`http://127.0.0.1:8000/api/news/latest-news/?item_type=job&page=${nextPage}`)
      .then((response) => {
        // Concatenate the new news items to the existing list
        setLatestNews((prevNews) => [...prevNews, ...response.data.results]);
        setCurrentPage(nextPage); // Update the current page number
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (newStoryText && newStoryTitle) {
      setIsLoading(true);

      const requestData = {
        item_type: "story",
        by: generateRandomBy(),
        text: newStoryText,
        title: newStoryTitle,
      };

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/news/create/",
          requestData
        );

        console.log("Story created:", response.data);

        // Reset form fields after successful submission
        setNewStoryText("");
        setNewStoryTitle("");
      } catch (error) {
        console.error("Error creating story:", error);
      }

      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Make the API call when the component mounts
    axios
      .get("http://127.0.0.1:8000/api/news/latest-news/?item_type=job")
      .then((response) => {
        // console.log(response.data.results);
        setLatestNews(response.data.results); // Assuming the API returns an array of news items
      })
      .catch((error) => {
        console.error("Error fetching latest news:", error);
      });
  }, []);

  return (
    <Layout latestNews={latestNews}>
      <div className="grid grid-cols-12 gap-5 min-h-screen">
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
            <div className="w-full flex justify-center items-center">
              <button
                className="bg-orange-500 my-5 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                onClick={loadMoreNews}
              >
                Load More
              </button>
            </div>
          </div>
        </section>
        {/* third col */}
        <div className="col-span-4 mx-3">
          <form className="flex flex-col space-y-4" onSubmit={handlePostSubmit}>
            <input
              type="text"
              placeholder="Title"
              className="block w-full p-2 border rounded"
              value={newStoryTitle}
              onChange={(e) => setNewStoryTitle(e.target.value)}
            />
            <textarea
              placeholder="What's happening?"
              className="block w-full p-2 border rounded"
              value={newStoryText}
              onChange={(e) => setNewStoryText(e.target.value)}
            />
            <button
              type="submit"
              className={`ml-auto bg-orange-500 ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-500"
              } text-white py-2 px-4 rounded`}
              disabled={isLoading}
            >
              {isLoading ? "Posting..." : "Post"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default JobsPage;