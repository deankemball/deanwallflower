"use client";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ReelProvider } from "app/context/ReelContext";
import "app/globals.css";
import { motion, useAnimation } from "framer-motion";
import IndexHero from "@/components/layout/IndexHero";
import Link from "next/link";
import MuteInfoButtons from "@/components/layout/MuteInfoButtons";
import InfoBox from "@/components/layout/InfoBox";
import NextPrevButton from "@/components/layout/NextPrevButton";
import ContactForm from "@/components/layout/ContactForm";
import { Analytics } from "@vercel/analytics/react";
import AboutMobile from "@/components/layout/AboutMobile";
import ContactFormMobile from "@/components/layout/ContactFormMobile";
import { slugs } from "./data/slugs";

type LayoutProps = {
  children: any;
};

export type ShowUIType = {
  about: boolean;
  reel: boolean;
  reelInfo: boolean;
  contact: boolean;
  projects: boolean;
};

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const [selected, setSelected] = useState("");
  const [showUI, setShowUI] = useState<ShowUIType>({
    about: false,
    reel: false,
    reelInfo: false,
    contact: false,
    projects: false,
  });

  const links = [
    { link: "", display: "about", cols: "md:col-start-6" },
    { link: "/", display: "projects", cols: "md:col-start-7" },
    { link: "/reel", display: "reel", cols: "md:col-start-8" },
    { link: "", display: "contact", cols: "md:col-start-9" },
  ];

  const [muted, setMuted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const controlNextPrev = useAnimation();
  const controlShowInfo = useAnimation();
  const controlContact = useAnimation();
  const controlAbout = useAnimation();

  const contactVariants = {
    inactive: {
      display: "none",
      opacity: 0,
      transition: {
        duration: 0.3,
        type: "linear",
        display: {
          delay: 0.3,
        },
      },
    },
    active: {
      display: "block",
      opacity: 1,
      transition: {
        duration: 0.3,
        type: "linear",
      },
    },
  };

  const nextPrevVariants = {
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

  useEffect(() => {
    if (showInfo) {
      controlShowInfo.start("active");
    } else {
      controlShowInfo.start("inactive");
    }
  }, [showInfo]);

  useEffect(() => {
    if (showUI.reel) {
      controlNextPrev.start("active");
    } else {
      controlNextPrev.start("inactive");
    }
    if (!showUI.reel && isMobile) {
      setShowInfo(false);
    }
    if (showUI.contact) {
      controlContact.start("active");
    } else {
      controlContact.start("inactive");
    }
  }, [showUI]);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(true);

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

  useEffect(() => {
    if (pathname?.includes("projects/")) {
      setShowUI((prev) => {
        return {
          about: false,
          contact: false,
          projects: true,
          reel: false,
          reelInfo: false,
        };
      });
    }
  }, [pathname]);

  useEffect(() => {
    if (showUI.about) {
      controlAbout.start("active");
    } else {
      controlAbout.start("inactive");
    }
  }, [showUI]);

  return (
    <html lang="en">
      <head>
        <title>
          {pathname?.includes("reel/")
            ? `deanwallflower—${Object.values(slugs)
                [
                  Object.keys(slugs).indexOf(pathname.split("reel/")[1])
                ].title.split(" —")[0]
                .toLowerCase()}`
            : "deanwallflower"}
        </title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Dean Wallflowers portfolio of generative motion graphics."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="Mona-Sans.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="true"
        ></link>
      </head>
      <body className="relative">
        <Analytics />
        <ReelProvider>
          <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            themes={["light", "dark"]}
            value={{
              light: "light",
              dark: "dark",
            }}
          >
            <div
              className={clsx(
                isMobile ? "grid-cols-4" : "grid-cols-9",
                "grid grid-rows h-screen w-screen absolute inset-0 z-50 scrollbar-hide p-8 overflow-clip"
              )}
            >
              {!isMobile ? (
                <div className={"md:col-span-3 xl:col-span-2"}>
                  <Header
                    selected={selected}
                    setShowUI={setShowUI}
                    setShowInfo={setShowInfo}
                    isMobile={isMobile}
                    controlAbout={controlAbout}
                  />
                </div>
              ) : null}
              {links.map((item, i) => (
                <div
                  key={item.display}
                  className={clsx(
                    item.cols,
                    i === links.length - 1 && "border-r-2",
                    "select-none text-fat tracking-wide text-sm md:text-lg lg:text-2xl border-l-2 border-t-2 border-b-2 border-white border-dashed cursor-pointer col-span-1"
                  )}
                  onClick={(event) => {
                    if (item.display === "contact") {
                      if (isMobile) {
                        setShowUI((prev) => {
                          const previous =
                            prev[item.display as keyof typeof prev];
                          return {
                            ...prev,
                            [item.display]: !previous,
                            about: false,
                            projects: false,
                          };
                        });
                      } else {
                        setShowUI((prev) => {
                          const previous =
                            prev[item.display as keyof typeof prev];
                          return {
                            ...prev,
                            [item.display]: !previous,
                            projects: false,
                          };
                        });
                      }
                    } else if (item.display === "about") {
                      if (isMobile) {
                        setShowUI((prev) => {
                          const previous =
                            prev[item.display as keyof typeof prev];
                          return {
                            ...prev,
                            [item.display]: !previous,
                            contact: false,
                            projects: false,
                          };
                        });
                      } else {
                        setShowUI((prev) => {
                          const previous =
                            prev[item.display as keyof typeof prev];
                          return {
                            ...prev,
                            [item.display]: !previous,
                            projects: false,
                          };
                        });
                      }
                    } else if (item.display === "projects") {
                      setShowInfo(false);
                      {
                        !pathname?.includes("project") &&
                          setShowUI((prev) => {
                            const previous =
                              prev[item.display as keyof typeof prev];
                            return {
                              ...prev,
                              [item.display]: !previous,
                              contact: false,
                              about: false,
                              reel: false,
                              reelInfo: false,
                            };
                          });
                      }
                    } else if (item.display === "reel") {
                      setShowUI((prev) => {
                        const previous =
                          prev[item.display as keyof typeof prev];
                        setShowInfo((prev) => {
                          return !previous;
                        });
                        return {
                          ...prev,
                          [item.display]: !previous,
                          projects: false,
                        };
                      });
                    } else {
                      setShowUI((prev) => {
                        const previous =
                          prev[item.display as keyof typeof prev];
                        return {
                          ...prev,
                          [item.display]: !previous,
                        };
                      });
                    }
                  }}
                >
                  {item.display === "projects" ? (
                    <Link href="/projects">
                      <p
                        className={clsx(
                          showUI[item.display as keyof typeof showUI]
                            ? "bg-accent/50"
                            : "hover:bg-accent/20 bg-black/50",
                          "flex flex-col justify-center items-center w-full h-full cursor-pointer flex-1"
                        )}
                      >
                        {item.display}
                      </p>
                    </Link>
                  ) : item.link === "/reel" ? (
                    <Link
                      href={
                        !pathname?.includes("reel")
                          ? `/reel/${Object.keys(slugs)[0]}`
                          : item.link
                      }
                      className={clsx(
                        pathname?.includes("reel") && "pointer-events-none"
                      )}
                    >
                      <p
                        className={clsx(
                          showUI[item.display as keyof typeof showUI]
                            ? "bg-accent/50"
                            : "hover:bg-accent/20 bg-black/50",
                          "flex flex-col justify-center items-center w-full h-full cursor-pointer flex-1"
                        )}
                      >
                        {item.display}
                      </p>
                    </Link>
                  ) : pathname?.includes("reel") ? (
                    <p
                      className={clsx(
                        showUI[item.display as keyof typeof showUI]
                          ? "bg-accent/50"
                          : "md:hover:bg-accent/20 bg-black/50",
                        "flex flex-col justify-center items-center w-full h-full cursor-pointer"
                      )}
                    >
                      {item.display}
                    </p>
                  ) : (
                    <Link
                      href="/"
                      className={clsx(
                        showUI[item.display as keyof typeof showUI]
                          ? "bg-accent/50"
                          : "md:hover:bg-accent/20 bg-black/50",
                        "flex flex-col justify-center items-center w-full h-full cursor-pointer"
                      )}
                    >
                      {item.display}
                    </Link>
                  )}
                </div>
              ))}
              <motion.div
                initial={"inactive"}
                animate={controlContact}
                variants={contactVariants}
                className="row-start-2 col-start-1"
              >
                {isMobile ? (
                  <ContactFormMobile
                    setShowUI={setShowUI}
                    width={width}
                    height={height}
                    isMobile={isMobile}
                  />
                ) : (
                  <ContactForm
                    setShowUI={setShowUI}
                    width={width}
                    height={height}
                    isMobile={isMobile}
                  />
                )}
              </motion.div>
              {isMobile && (
                <AboutMobile
                  control={controlAbout}
                  variants={contactVariants}
                  isMobile={isMobile}
                />
              )}
              <motion.div
                className="col-start-1 col-span-4 md:col-start-1 md:col-span-full md:row-start-2 flex items-center justify-center"
                initial="pageInitial"
                animate="pageAnimate"
                exit="pageExit"
                // variants={direction === "up" ? pageUp : pageDown}
                variants={{
                  pageExit: {
                    opacity: 0,
                    // y: "100%",
                    transition: {
                      delay: 0.1,
                      duration: 0.2,
                      ease: "easeOut",
                    },
                  },
                  pageAnimate: {
                    opacity: 1,
                    // y: "0%",
                    transition: {
                      delay: 0.1,
                      duration: 0.3,
                      ease: "easeIn",
                    },
                  },
                  pageInitial: {
                    opacity: 0,
                    // y: "-100%",
                    transition: {
                      delay: 0.1,
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  },
                }}
              >
                {children}
              </motion.div>
              {isMobile ? (
                <div className="row-start-3 col-span-4 flex items-end">
                  <InfoBox controlShowInfo={controlShowInfo} />
                </div>
              ) : (
                <div className="md:col-span-3 col-start-1 row-start-3 flex flex-col justify-center">
                  <InfoBox controlShowInfo={controlShowInfo} />
                </div>
              )}
              <motion.div
                initial={"inactive"}
                animate={controlNextPrev}
                variants={nextPrevVariants}
                className="row-start-4 md:row-start-3 col-start-2 col-span-2 md:col-start-7 md:col-span-1 flex justify-end"
              >
                <MuteInfoButtons
                  showInfo={showInfo}
                  setShowInfo={setShowInfo}
                  controlNextPrev={controlNextPrev}
                />
              </motion.div>
              <motion.div
                initial={"inactive"}
                animate={controlNextPrev}
                variants={nextPrevVariants}
                className={clsx(
                  isMobile
                    ? "border-l-2 border-t-2 border-b-2"
                    : "border-r-2 border-t-2 border-b-2",
                  "row-start-4 md:row-start-3 col-start-1 md:col-start-8 col-span-1 border-dashed border-white"
                )}
              >
                <NextPrevButton previous={true} showInfo={showInfo} />
              </motion.div>
              <motion.div
                initial={"inactive"}
                animate={controlNextPrev}
                variants={nextPrevVariants}
                className="row-start-4 md:row-start-3 col-start-4 md:col-start-9 col-span-1 border-r-2 border-t-2 border-b-2 border-dashed border-white relative"
              >
                <NextPrevButton previous={false} showInfo={showInfo} />
              </motion.div>
            </div>
            <div className="absolute inset-0 z-0 bg-black">
              {!pathname?.includes("reel") && <IndexHero />}
            </div>
          </ThemeProvider>
        </ReelProvider>
      </body>
    </html>
  );
}
