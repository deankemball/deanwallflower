"use client";
import { projects } from "@/app/data/projects";
import clsx from "clsx";
import { AnimationControls, motion, useAnimation } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/public/icons/LoadingSpinner.svg";

interface ProjectProps {}

const Project = ({}: ProjectProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const mobileWatcher = window.matchMedia("(max-width: 768px)");
    setIsMobile(mobileWatcher.matches);

    function updateIsMobile(e: any) {
      setIsMobile(e.matches);
    }

    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      setWidth(width);
      setHeight(height);
    }
    handleResize();
    mobileWatcher.addEventListener("change", updateIsMobile);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      mobileWatcher.removeEventListener("change", updateIsMobile);
    };
  }, []);

  return (
    <div
      className={clsx(
        isMobile ? "mt-4" : "mt-20",
        "fixed top-20 left-8 right-8 select-none row-start-2 col-span-full flex flex-col justify-center my-auto h-full max-h-[calc(100dvh-128px)] md:max-h-[calc(100dvh-196px)] overflow-hidden scrolbar-hide bg-black/25"
      )}
    >
      <div className="w-full h-fit grid grid-col-1 md:grid-cols-9 items-center justify-center gap-4 overflow-y-scroll scrollbar-hide">
        {projects.map((project) => {
          return (
            <Link
              href={`projects/${project.slug}`}
              className="h-[320px] md:h-[400px] col-span-3 flex flex-col border-2 border-dashed border-white p-4 bg-black/50 hover:bg-accent/20 cursor-pointer relative"
            >
              <div className="flex w-full gap-4 items-baseline justify-between">
                <h2 className="select-none text-fat tracking-wide text-2xl italic">
                  {project.title}
                </h2>
                <p>{project.year}</p>
              </div>
              <p className="text-xl leading-[20px] lg:text-2xl lg:leading-[24px] font-light">
                {project.description}
              </p>
              <div className="absolute aspect-video bottom-4 left-4 right-4 flex justify-center items-center">
                <LoadingSpinner className="text-4xl shrink-0 z-0" />
              </div>
              <video
                className="aspect-video object-contain object-bottom w-full max-w-[460px] mx-auto z-10"
                autoPlay={true}
                loop={true}
                muted={true}
                playsInline={true}
                src={project.video}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Project;
