"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Layout } from "@/app/components/Layout";
import axios from "axios";
import Latest from "@/app/components/Latest";

const Search = ({ params }) => {
  const router = useRouter();
  const [searchResults, setsearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);


  const loadMoreNews = () => {
    // Increment the current page number and make API call for next page
    const nextPage = currentPage + 1;
    axios
      .get(`http://127.0.0.1:8000/api/news/search/?page=${nextPage}&query=${params.search_query}`)
      .then((response) => {
        // add news items from next page to the existing list
        setsearchResults((prevNews) => [...prevNews, ...response.data.results]);
        setCurrentPage(nextPage); 
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/news/search?query=${params.search_query}`)
      .then((response) => {
        // console.log(response.data.results);
        setsearchResults(response.data.results); // Assuming the API returns an array of news items
      })
      .catch((error) => {
        console.error("Error fetching latest news:", error);
      });
  }, []);

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      // Redirect to /search/<query> route
      router.push(`/search/${e.target.value}`);
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-12 min-h-screen">
        <section className="flex flex-col gap-5 col-span-8">
          <div className=" grid grid-cols-12 gap-2">
            <div className="col-span-12 ">
              <input
                type="text"
                defaultValue={params.search_query}
                placeholder="Search HackersFeed"
                className="border rounded p-2 w-full"
                onKeyDown={handleSearchEnter}
              />
            </div>
            <div className="col-span-3 ">
              <Latest latestNews={searchResults} />
              <div className="w-full flex justify-center items-center">
                <button
                  className="bg-orange-500 my-5 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                  onClick={loadMoreNews}
                >
                  Load More
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Search;

