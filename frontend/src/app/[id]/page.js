"use client";
import React from "react";
import axios from "axios";
import { Layout } from "../components/Layout";
import HeadLine from "../components/HeadLine";
import HackersFeedHottest from "../components/HackersFeedHottest";
import DetailView from "../components/DetailView";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Article = ({ params }) => {
  const [article, setArticle] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const id = params.id;

    if (id) {
      axios
        .get(`http://127.0.0.1:8000/api/news/${id}`)
        .then((response) => {
          setArticle(response.data);
        })
        .catch((error) => {
          console.error("Error fetching article details:", error);
        });
    }
  }, [router.query]);

  return (
    <Layout>
      <div className="flex gap-2 p-3">
        <section className=" gap-5 w-full  md:w-[70%]">
          

          <div className="my-9  ">
            {article ? (
              <DetailView article={article} /> // Pass the fetched article as a prop
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </section>

        <div className="h-96 sticky top-0 hidden md:flex w-[30%]">
        <HackersFeedHottest />
        </div>
      </div>
    </Layout>
  );
};

export default Article;
