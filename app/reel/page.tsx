"use client";
import React from "react";
import { slugs } from "../data/slugs";
import { useReelContext } from "../context/ReelContext";

const Reel = () => {
  const { reelIndex, muted } = useReelContext();

  return (
    // <div className="grid grid-cols-3 grid-rows-3 w-full h-[calc(100%-72px)] border-l-2 border-b border-dashed">
    //   {Object.entries(slugs).map(([key, value]) => {
    //     console.log(key);
    //     return (
    //       <Link
    //         href={`/reel/${key}`}
    //         key={value.title}
    //         className="flex justify-center relative border-r-2 border-t-2 border-dashed"
    //       >
    //         <Image
    //           src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/video/upload/${value.thumbnail}`}
    //           alt={`${value.description} video thumbnail`}
    //           fill={true}
    //           className="object-cover aspect-ratio"
    //         />
    //       </Link>
    //     );
    //   })}
    // </div>
    <video
      key={Object.keys(slugs)[reelIndex]}
      className="absolute inset-0 -z-10"
      // src={`https://res.cloudinary.com/dy71wo1by/video/upload/samples/${
      //   Object.values(slugs)[reelIndex]
      // }`}
      src={`https://res.cloudinary.com/${
        process.env.NEXT_PUBLIC_CLOUDINARY_NAME
      }/video/upload/reel/q_auto,vc_auto/${
        Object.values(slugs)[reelIndex].link
      }`}
      autoPlay={true}
      loop={true}
      muted={muted}
      playsInline={true}
    />
  );
};

export default Reel;
