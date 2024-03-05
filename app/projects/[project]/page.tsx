"use client";
import { projects } from "@/app/data/projects";
import clsx from "clsx";
import { AnimationControls, motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import CloseIcon from "@/public/icons/CloseIcon.svg";
import ExternalLink from "@/public/icons/ExternalLink.svg";

import Image from "next/image";

interface ProjectProps {}

const Project = ({}: ProjectProps) => {
  const pathname = usePathname();
  const slug = pathname?.split("projects/")[1];
  const project = projects.filter((project) => {
    return project.slug === slug;
  })[0];

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
        "fixed top-20 left-8 right-8 select-none row-start-2 col-span-full flex flex-col justify-center my-auto h-full max-h-[calc(100dvh-128px)] md:max-h-[calc(100dvh-196px)] overflow-hidden scrolbar-hide bg-black/50"
      )}
    >
      <Link
        href="/projects"
        className="absolute right-0 top-0 border-l-2 border-b-2 border-white border-dashed w-[50px] aspect-square flex items-center justify-center hover:bg-accent/25 cursor-pointer text-2xl pt-0.5 pr-0.5"
      >
        <CloseIcon />
      </Link>
      <div className="border-2 border-dashed border-white w-full p-4 overflow-scroll scrollbar-hide h-full">
        <div className="max-w-7xl">
          <div className="flex flex-col">
            <div className="flex gap-4 items-baseline">
              <h1 className="text-fat tracking-wide text-2xl italic">
                {project.title}
              </h1>
              <p>{project.year}</p>
            </div>
            {project.venue ? (
              <a
                href={project.venue.link}
                target="_blank"
                rel="noreferrer"
                className="flex gap-2 items-center md:hover:text-accent w-fit"
              >
                <span>{`${project.venue.name}, ${project.location}`}</span>
                <ExternalLink className="text-2xl" />
              </a>
            ) : null}
            {project.collaborators ? (
              <div className="flex gap-1 flex-wrap">
                <p>Collaborators: </p>
                {project.collaborators?.map((collaborator) => {
                  return (
                    <a
                      key={collaborator.name}
                      href={collaborator.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex gap-2 items-center md:hover:text-accent w-fit"
                    >
                      <span>{collaborator.name}</span>
                      <ExternalLink className="text-2xl" />
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className="mt-4 text-xl leading-[20px] lg:text-2xl lg:leading-[24px] font-light">
            {project.text}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {project.photos?.map((photo, index) => {
              return photo.includes(".mp4") ? (
                <video
                  key={`${project.title}-video-${index}`}
                  className="h-fit col-span-full w-full mx-auto mt-4"
                  autoPlay={false}
                  loop
                  controls
                  src={photo}
                />
              ) : (
                <Image
                  key={`${project.title}-image-${index}`}
                  className="object-contain"
                  width={"1980"}
                  height={"1080"}
                  src={photo}
                  alt={`${project.title}-image-${index}`}
                  priority={index <= 3}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
