"use client";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ChevronRightIcon from "public/icons/ChevronRightIcon.svg";
import { motion, useAnimation } from "framer-motion";
import { useReelContext } from "app/context/ReelContext";
import { mod } from "lib/mod";
import { ShowUIType } from "@/app/layout";
import MuteInfoButtons from "components/layout/MuteInfoButtons";

export const menuItems = ["home", "about", "reel"];

interface ReelControlsProps {
  setSelected: Dispatch<SetStateAction<string>>;
  selected: string;
  showUI: ShowUIType;
  setShowUI: Dispatch<SetStateAction<ShowUIType>>;
}

export default function ReelControls({
  setSelected,
  selected,
  showUI,
  setShowUI,
}: ReelControlsProps): JSX.Element {
  const { slugs, reelIndex, setReelIndex, showInfo } = useReelContext();
  const controlNextPrev = useAnimation();
  const controlShowInfo = useAnimation();
  const variants = {
    inactive: {
      y: "100%",

      opacity: 0,
      transition: {
        duration: 0.3,
        type: "linear",
        height: {
          duration: 0.1,
        },
        opacity: {
          duration: 0.1,
        },
      },
    },
    active: {
      y: "0%",

      opacity: 1,
      transition: {
        duration: 0.3,
        type: "linear",
        height: {
          // delay: 0.1,
          type: "linear",
        },
      },
    },
  };

  useEffect(() => {
    if (showUI.reel) {
      controlNextPrev.start("active");
    } else {
      controlNextPrev.start("inactive");
    }
  }, [showUI]);

  useEffect(() => {
    if (showInfo) {
      controlShowInfo.start("active");
    } else {
      controlShowInfo.start("inactive");
    }
  }, [showInfo]);

  return (
    <motion.div
      className={"flex justify-between"}
      initial={"inactive"}
      animate={controlNextPrev}
      variants={variants}
    >
      <div className="flex border-2 border-dashed border-white cursor-pointer bg-black/50 text-4xl md:text-5xl lg:text-5xl divide-x-2 divide-dashed">
        <Link
          href={`/reel/${
            Object.keys(slugs)[mod(reelIndex - 1, Object.keys(slugs).length)]
          }`}
        >
          <div
            className="px-8 flex flex-col justify-center items-center h-24 w-40 hover:bg-accent/20 active:bg-accent/50 "
            onClick={() =>
              setReelIndex((prev) => mod(prev - 1, Object.keys(slugs).length))
            }
          >
            <ChevronRightIcon className="rotate-180" />
          </div>
        </Link>
        <Link
          href={`/reel/${
            Object.keys(slugs)[mod(reelIndex + 1, Object.keys(slugs).length)]
          }`}
        >
          <div
            className="px-8 flex flex-col justify-center items-center h-24 w-40 hover:bg-accent/20 active:bg-accent/50"
            onClick={() =>
              setReelIndex((prev) => mod(prev + 1, Object.keys(slugs).length))
            }
          >
            <ChevronRightIcon />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
