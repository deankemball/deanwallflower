import { AnimationControls, motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ShowUIType } from "@/app/layout";
import About from "./About";

interface HeaderProps {
  selected: string;
  setShowUI: Dispatch<SetStateAction<ShowUIType>>;
  setShowInfo: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
  controlAbout: AnimationControls;
}

function Header({
  setShowUI,
  setShowInfo,
  isMobile,
  controlAbout,
}: HeaderProps) {
  const variants = {
    inactive: {
      y: "-100%",
      height: "0px",
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
      height: "100%",
      opacity: 1,
      transition: {
        duration: 0.3,
        type: "linear",
        height: {
          delay: 0.1,
          type: "linear",
        },
      },
    },
  };

  return (
    <div className="flex flex-col">
      <Link href={"/"}>
        <div
          className={
            "text-fat flex flex-col h-[3rem] md:h-[6rem] justify-center px-4 text-black z-10 dark:text-white border-l-2 border-t-2 border-b-2 md:border-r-2 border-dashed border-white transition-colors duration-150 select-none -space-y-2 text-sm md:text-3xl md:leading-[26px] lg:text-4xl lg:leading-[32px] cursor-pointer hover:bg-accent/20 active:bg-accent/50 bg-black/50"
          }
          onClick={() => {
            setShowUI({
              about: false,
              reel: false,
              reelInfo: false,
              contact: false,
              projects: false,
            });
            setShowInfo(false);
          }}
        >
          {isMobile ? (
            <p className="flex justify-center">home</p>
          ) : (
            <div className="flex flex-col italic text-fat">
              <p>dean</p>
              <p>wallflower</p>
            </div>
          )}
        </div>
      </Link>
      {!isMobile && (
        <About control={controlAbout} variants={variants} isMobile={isMobile} />
      )}
    </div>
  );
}

export default Header;
