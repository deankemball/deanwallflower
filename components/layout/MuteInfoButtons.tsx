"use client";
import React from "react";
import { useReelContext } from "app/context/ReelContext";
import UnMuteIcon from "public/icons/UnMuteIcon.svg";
import InfoOnIcon from "public/icons/InfoOnIcon.svg";
import clsx from "clsx";
import { AnimationControls } from "framer-motion";

interface MuteInfoProps {
  showInfo: boolean;
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
  controlNextPrev: AnimationControls;
}

const MuteInfoButtons = ({
  showInfo,
  setShowInfo,
  controlNextPrev,
}: MuteInfoProps) => {
  const { muted, setMuted } = useReelContext();
  return (
    <div className="flex flex-row w-full md:w-fit md:flex-col border-2 border-dashed divide-x-2 md:divide-x-0 md:divide-y-2 divide-dashed divide-white">
      <div
        className={clsx(
          !muted ? "bg-accent/50" : "bg-black/50 ",
          "md:px-8 flex flex-col justify-center items-center h-full w-full md:h-12 md:w-12 md:hover:bg-accent/20 active:bg-accent/50 cursor-pointer text-2xl md:text-3xl lg:text-4xl"
        )}
        onClick={() => setMuted((prev) => !prev)}
      >
        <UnMuteIcon />
      </div>
      <div
        className={clsx(
          showInfo ? "bg-accent/50" : "bg-black/50 ",
          "md:px-8 flex flex-col justify-center items-center h-full w-full md:h-12 md:w-12 md:hover:bg-accent/20 active:bg-accent/50 cursor-pointer text-2xl md:text-3xl lg:text-4xl"
        )}
        onClick={() => setShowInfo((prev) => !prev)}
      >
        <InfoOnIcon />
      </div>
    </div>
  );
};

export default MuteInfoButtons;
