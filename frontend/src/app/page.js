import HeadLine from "./components/HeadLine";
import HackersFeedHottest from "./components/HackersFeedHottest";
import React from "react";
import { Layout } from "./components/Layout";
import Latest from "./components/Latest";

const LandingPage = () => {
  return (
    <Layout>
      <div className="grid grid-cols-12 min-h-screen">
        <section className="flex flex-col gap-5 col-span-8">
        <div className=" grid grid-cols-12">
          <div className="col-span-9 ">
            <HeadLine />
          </div>
          <div className="col-span-3 ">
            <HackersFeedHottest />
          </div>
        </div>

        <div className="my-9">
          <Latest/>
        </div>

        </section>
        {/* third col */}
        <div className="col-span-4"></div>
      </div>
    </Layout>
  );
};

export default LandingPage;
