"use client"
import React from "react";
import Image from "next/image";
import glitch from "../../../public/assets/icons/glitch.jpeg";

const DetailView = ({article}) => {
//    console.log("article=",article)
  return (
   <>
   <div className="flex flex-col justify-center ">
    <div><p className="text-sm font-light text-green-500"> {article.title}</p></div>
    <div><h1 className="text-2xl font-bold ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla eius maiores veniam asperiores ipsum tempore sint molestias unde aliquam accusantium odit labore quasi est nesciunt, quis ipsa, modi repellat sit. pheading of the news goes here</h1></div>

    <div className="flex gap-5 my-5">
    <div className="text-sm  font-bold">authors name</div>
    <div className="text-sm  font-light">@authors mail</div>
    <h1 className="text-sm text-gray-400 font-bold">article time</h1>
    </div>

    <div>
    <Image src={glitch} width={500} height={500} className="" />
    </div>

    <div className="my-5">
    <h1 className="text-[15px] font-light">

        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia quia obcaecati asperiores impedit quasi optio velit est omnis mollitia. Molestias odio officia nisi nam ad, corporis voluptate placeat ea ipsam.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione ipsam quidem voluptate non, deserunt reiciendis perferendis. Nulla hic totam eius veniam obcaecati mollitia, perferendis vitae aspernatur cupiditate laborum et aliquam!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum fugiat excepturi quidem eius sapiente consequuntur obcaecati eligendi quae. Reprehenderit earum a ab numquam voluptas consequuntur assumenda at dignissimos saepe reiciendis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, molestias dolorem! Dolorum placeat molestias amet cum architecto quos nihil magnam consequuntur ducimus corporis voluptatibus sequi, repellat, dolorem magni officiis laboriosam.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate maiores beatae suscipit reiciendis ab sunt vel adipisci, cum blanditiis eveniet illo nesciunt numquam magnam inventore, illum fuga, repudiandae cumque aut!
    </h1>
    </div>


   </div>
   </>
  );
};

export default DetailView;
