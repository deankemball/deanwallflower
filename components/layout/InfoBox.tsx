import { useReelContext } from "@/app/context/ReelContext";
import { slugs } from "@/app/data/slugs";
import { AnimationControls, motion } from "framer-motion";
import React from "react";

interface InfoBoxProps {
  controlShowInfo: AnimationControls;
}

const InfoBox = ({ controlShowInfo }: InfoBoxProps) => {
  const variants = {
    inactive: {
      y: "100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        type: "linear",
      },
    },
    active: {
      y: "0%",

      opacity: 1,
      transition: {
        duration: 0.3,
        type: "linear",
      },
    },
  };

  const { reelIndex } = useReelContext();
  return (
    <motion.div
      initial={"inactive"}
      animate={controlShowInfo}
      variants={variants}
      className="flex flex-col justify-between h-full w-full px-4 py-2 bg-black/50 border-l-2 border-t-2 border-r-2 md:border-2 border-dashed border-white"
    >
      <div className="flex justify-between w-full items-baseline">
        <h2 className="text-mid text-md leading-[16px] md:text-md lg:text-lg md:leading-[16px] lg:leading-[18px] w-full  max-w-xs">
          {Object.values(slugs)[reelIndex].title}
        </h2>
        <p className="text-xs md:text-sm lg:text-xs">
          {Object.values(slugs)[reelIndex].year}
        </p>
      </div>
      <p className="text-sm md:text-md lg:text-lg leading-[14px] md:leading-[16px] lg:leading-[18px] text-thin italic">
        {Object.values(slugs)[reelIndex].description}
      </p>
    </motion.div>
  );
};

export default InfoBox;
