import React from "react";

interface ErrorMessageProps {
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

const ErrorMessage = ({ setError }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-between absolute inset-4 z-50">
      <div className="flex flex-col items-center flex-1 justify-center">
        <p>uhh..</p>
        <p>something went wrong</p>
      </div>
      <button
        className="flex w-full justify-center items-center border-[1px] border-dashed p-2"
        onClick={() => setError(false)}
      >
        try again
      </button>
    </div>
  );
};

export default ErrorMessage;
