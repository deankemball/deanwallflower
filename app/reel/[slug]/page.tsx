"use client";
import { useReelContext } from "@/app/context/ReelContext";
import { slugs } from "@/app/data/slugs";
import { usePathname } from "next/navigation";

import React, { useEffect } from "react";

const Reel = () => {
  const pathname = usePathname();
  const { reelIndex, setReelIndex, muted } = useReelContext();
  console.log(
    `https://res.cloudinary.com/${
      process.env.NEXT_PUBLIC_CLOUDINARY_NAME
    }/video/upload/reel/q_auto,vc_auto/${Object.values(slugs)[reelIndex].link}`
  );
  useEffect(() => {
    pathname &&
      setReelIndex(Object.keys(slugs).indexOf(pathname.split("reel/")[1]));
  }, [pathname]);

  return (
    <video
      key={Object.keys(slugs)[reelIndex]}
      className="absolute inset-0 -z-10"
      // src={`https://res.cloudinary.com/dy71wo1by/video/upload/samples/${
      //   Object.values(slugs)[reelIndex]
      // }`}
      src={`https://res.cloudinary.com/${
        process.env.NEXT_PUBLIC_CLOUDINARY_NAME
      }/video/upload/reel/${Object.values(slugs)[reelIndex].link}`}
      autoPlay={true}
      loop={true}
      muted={muted}
      playsInline={true}
    />
  );
};

export default Reel;
