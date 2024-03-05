import React from "react";
import LoadingSpinner from "public/icons/LoadingSpinner.svg";

const Loading = () => {
  return (
    <div className="flex items-center justify-center text-6xl absolute inset-0 z-50">
      <LoadingSpinner />
    </div>
  );
};

export default Loading;
