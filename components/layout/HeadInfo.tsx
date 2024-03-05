"use client";
import Head from "next/head";

interface HeadProps {
  title: string;
  name: string;
  content: string;
}

function HeadInfo({ title, name, content }: HeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name={name} content={content} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default HeadInfo;
