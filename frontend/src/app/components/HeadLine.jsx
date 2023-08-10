import Image from "next/image";
import glitch from "../../../public/assets/icons/glitch.jpeg"

const HeadLine = () => {
  return (
    <section className="flex flex-col gap-3">
      <h1 className="font-bold text-5xl">Big Headline News Title here</h1>
      <h2 className="font-normal text-gray-400 text-lg">Subheading of headline News Title here</h2>
      <p className="text-sm font-bold">Author name</p>
      <Image src={glitch} width={500} height={500} className=""/>
      {/* <div className="bg-gray-200 w-24 h-24 rounded-md">
        Content inside the square bounding box
        You can add more content here
        headline image here
      </div> */}
      
    </section>
  );
};

export default HeadLine;
