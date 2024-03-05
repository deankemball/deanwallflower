import clsx from "clsx";
import { AnimationControls, motion } from "framer-motion";
import React from "react";

interface AboutProps {
  control: AnimationControls;
  variants: any;
  isMobile: boolean;
}

const AboutMobile = ({ control, variants, isMobile }: AboutProps) => {
  return (
    <motion.div
      className="absolute left-8 right-8 top-[20%] bottom-[60px] text-xl md:text-xl lg:text-2x flex my-auto shrink-0"
      initial={"inactive"}
      animate={control}
      variants={variants}
    >
      <div className="flex flex-col justify-center gap-2 border-2 border-dashed border-white p-4 overflow-hidden select-none bg-black/50 h-fit w-full">
        <h2 className="text-fat italic text-4xl leading-[40px] py-2 text-fat">
          dean wallflower
        </h2>
        <p className="text-light text-2xl leading-[26px]">
          is a media artist specialising in graphics and visual effects.
        </p>
        <p className="text-light text-2xl leading-[26px]">
          the generative art pieces are created in code and can be made
          audio-reactive.
        </p>
        <p className="text-light text-2xl leading-[26px]">
          this makes them perfect for video installations, music videos,
          background visuals on-stage, or content for social media.
        </p>
      </div>
    </motion.div>
  );
};

export default AboutMobile;
