"use client";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import { ShowUIType } from "@/app/layout";

const nonLinks = [{ link: "/about", display: "about" }];

export const links = [{ link: "/reel", display: "reel" }];

interface NavProps {
  setSelected: Dispatch<SetStateAction<string>>;
  selected: string;
  showUI: ShowUIType;
  setShowUI: Dispatch<SetStateAction<ShowUIType>>;
}

export default function Nav({
  setSelected,
  selected,
  showUI,
  setShowUI,
}: NavProps): JSX.Element {
  return (
    <div className="flex border-2 border-dashed border-white divide-x-2 divide-dashed divide-white select-none ml-auto">
      {nonLinks.map((item, i) => (
        <div
          key={item.display}
          className="font-regular tracking-wide text-2xl md:text-3xl lg:text-4xl"
        >
          <p
            className={clsx(
              showUI[item.display as keyof typeof showUI]
                ? "bg-accent/50"
                : "hover:bg-accent/20",

              "px-8 flex flex-col justify-center items-center h-24 w-40 cursor-pointer bg-black/50"
            )}
            onClick={(event) => {
              setShowUI((prev) => {
                const previous = prev[item.display as keyof typeof prev];
                return {
                  ...prev,
                  [item.display]: !previous,
                };
              });
            }}
          >
            {item.display}
          </p>
        </div>
      ))}
      {links.map((item, i) => (
        <div className="font-regular tracking-wide text-2xl md:text-3xl lg:text-4xl">
          <Link href={item.link}>
            <p
              className={clsx(
                showUI[item.display as keyof typeof showUI]
                  ? "bg-accent/50"
                  : "hover:bg-accent/20",
                "px-8 flex flex-col justify-center items-center h-24 w-40 cursor-pointer bg-black/50"
              )}
              onClick={(event) => {
                setShowUI((prev) => {
                  const previous = prev[item.display as keyof typeof prev];
                  return {
                    ...prev,
                    [item.display]: !previous,
                  };
                });
              }}
            >
              {item.display}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
