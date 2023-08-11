"use client";
import React from "react";
import axios from "axios";
import { Layout } from "../components/Layout";
import HeadLine from "../components/HeadLine";
import HackersFeedHottest from "../components/HackersFeedHottest";
import DetailView from "../components/DetailView";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const Article = () => {
  const [article, setArticle] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log("id=", id);

  useEffect(() => {
    // Get the 'id' from the query string
    // const { id } = router.query;
    // console.log(router.query);
    const id = 37086982;

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
            {article ? (
              <DetailView article={article} /> // Pass the fetched article as a prop
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </section>
        {/* third col */}
        <div className="col-span-4"></div>
      </div>
    </Layout>
  );
};

export default Article;
