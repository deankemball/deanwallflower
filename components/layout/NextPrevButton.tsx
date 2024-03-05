import { useReelContext } from "@/app/context/ReelContext";
import { slugs } from "@/app/data/slugs";
import { mod } from "@/lib/mod";
import Link from "next/link";
import React, { useEffect } from "react";
import ChevronRightIcon from "public/icons/ChevronRightIcon.svg";
import clsx from "clsx";
import { AnimationControls, motion } from "framer-motion";

interface NextPrevButtonProps {
  previous: boolean;
  showInfo: boolean;
}

const NextPrevButton = ({ previous, showInfo }: NextPrevButtonProps) => {
  const { reelIndex, setReelIndex } = useReelContext();

  return (
    <div className="relative h-full">
      {!previous && (
        <div
          className={clsx(
            showInfo ? "opacity-1 delay-100" : "opacity-0",
            "absolute -top-28 md:-top-6 right-0 text-thin select-none transition-opacity"
          )}
        >{`${reelIndex + 1} / ${Object.keys(slugs).length}`}</div>
      )}

      <Link
        href={
          previous
            ? `/reel/${
                Object.keys(slugs)[
                  mod(reelIndex - 1, Object.keys(slugs).length)
                ]
              }`
            : `/reel/${
                Object.keys(slugs)[
                  mod(reelIndex + 1, Object.keys(slugs).length)
                ]
              }`
        }
      >
        <div
          className="px-8 flex flex-col justify-center items-center h-full w-full md:hover:bg-accent/20 active:bg-accent/50 text-4xl md:text-5xl lg:text-5xl bg-black/50"
          onClick={() => {
            previous
              ? setReelIndex((prev) => mod(prev - 1, Object.keys(slugs).length))
              : setReelIndex((prev) =>
                  mod(prev + 1, Object.keys(slugs).length)
                );
          }}
        >
          <ChevronRightIcon className={clsx(previous && "rotate-180")} />
        </div>
      </Link>
    </div>
  );
};

export default NextPrevButton;
