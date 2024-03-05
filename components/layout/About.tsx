import clsx from "clsx";
import { AnimationControls, motion } from "framer-motion";
import React from "react";

interface AboutProps {
  control: AnimationControls;
  variants: any;
  isMobile: boolean;
}

const About = ({ control, variants, isMobile }: AboutProps) => {
  return (
    <motion.div
      className={clsx(
        isMobile && "col-span-4",
        "text-2xl md:text-xl lg:text-2xl lg:leading-[24px] font-light border-r-2 border-l-2 border-b-2 border-dashed border-white px-4 py-2 overflow-hidden select-none bg-black/50"
      )}
      initial={"inactive"}
      animate={control}
      variants={variants}
    >
      {isMobile && <h2 className="text-2xl">dean wallflower</h2>}
      <div className="flex flex-col gap-2 text-thin">
        <p>is a media artist specialising in graphics and visual effects.</p>
        <p>
          the generative art pieces are created in code and can be made
          audio-reactive.
        </p>
        <p>
          this makes them perfect for video installations, music videos,
          background visuals on-stage, or content for social media.
        </p>
      </div>
    </motion.div>
  );
};

export default About;
