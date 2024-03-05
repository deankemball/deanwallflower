function IndexHero() {
  const bgUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/video/upload/v1681579885/reel/home-bg_c64wxw.mp4`;
  return (
    <video
      className="opacity-10"
      src={bgUrl}
      autoPlay={true}
      loop={true}
      muted={true}
      playsInline={true}
    />
  );
}

export default IndexHero;
