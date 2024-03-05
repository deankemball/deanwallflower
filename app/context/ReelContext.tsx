"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ReelContextType = {
  slugs: {
    [x: string]: {
      title: string;
      description: string;
      year: string;
      link: string;
      thumbnail: string;
    };
  };
  reelIndex: number;
  setReelIndex: Dispatch<SetStateAction<number>>;
  muted: boolean;
  setMuted: Dispatch<SetStateAction<boolean>>;
  showInfo: boolean;
  setShowInfo: Dispatch<SetStateAction<boolean>>;
};

const ReelContext = createContext<ReelContextType>({} as ReelContextType);

export function ReelProvider({ children }: any) {
  const slugs = {
    amyl_and_the_sniffers: {
      title: "Amyl and the Sniffers — Some Mutts (Can't Be Muzzled)",
      description: "Lyric teaser video",
      year: "2022",
      link: "amyl-lyrics.mp4",
      thumbnail: "reel/amyl-lyrics.jpg",
    },
    baumarkt: {
      title: "Baumarkt — Hey Man",
      description: "Lyric visualizer produced for their Kopfschmerzen EP",
      year: "2023",
      link: "baumarkt-hey-man.mp4",
      thumbnail: "so_240/reel/baumarkt-hey-man.jpg",
    },
    schlusslicht: {
      title: "Schluss Licht — On the Run",
      description: "Audio reactive live visuals.",
      year: "2022",
      link: "schlusslicht-on-the-run.mp4",
      thumbnail: "so_180/reel/schlusslicht-on-the-run.jpg",
    },
    test1: {
      title: "Schluss Licht — On the Run",
      description: "Audio reactive live visuals.",
      year: "2022",
      link: "schlusslicht-on-the-run.mp4",
      thumbnail: "so_180/reel/schlusslicht-on-the-run.jpg",
    },
    test2: {
      title: "Schluss Licht — On the Run",
      description: "Audio reactive live visuals.",
      year: "2022",
      link: "schlusslicht-on-the-run.mp4",
      thumbnail: "so_180/reel/schlusslicht-on-the-run.jpg",
    },
    test3: {
      title: "Schluss Licht — On the Run",
      description: "Audio reactive live visuals.",
      year: "2022",
      link: "schlusslicht-on-the-run.mp4",
      thumbnail: "so_180/reel/schlusslicht-on-the-run.jpg",
    },
  };
  const [reelIndex, setReelIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const memoValue = useMemo(
    () => ({
      slugs,
      reelIndex,
      setReelIndex,
      muted,
      setMuted,
      showInfo,
      setShowInfo,
    }),
    [slugs, reelIndex]
  );

  return (
    <ReelContext.Provider value={memoValue}>{children}</ReelContext.Provider>
  );
}

export function useReelContext() {
  const context = useContext(ReelContext);

  if (!context)
    throw new Error(
      "useCommentsContext must be used inside a `CommentsProvider`"
    );

  return context;
}
