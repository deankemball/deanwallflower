import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { ShowUIType } from "@/app/layout";
import { sendContactForm } from "@/lib/api";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import DragIcon from "public/icons/DragIcon.svg";

interface ContactFormProps {
  setShowUI: React.Dispatch<React.SetStateAction<ShowUIType>>;
  width: number;
  height: number;
  isMobile: boolean;
}
export type FormDataType = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
const ContactForm = ({
  setShowUI,
  width,
  height,
  isMobile,
}: ContactFormProps) => {
  const fields = ["name", "email", "subject", "message"];
  const initialFormData: FormDataType = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const initialPosition = { x: width * 0.7, y: height * 0.08 };

  useEffect(() => {
    setPosition({
      x: width < 1020 ? width * 0.5 : width * 0.6,
      y: height * 0.05,
    });
  }, [width, height]);

  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const handleStart = (e: any, data: any) => {
    setIsDragging(true);
  };

  const handleDrag = (e: any, data: any) => {};

  const handleStop = (e: any, data: any) => {
    setPosition({ x: data.lastX, y: data.lastY });
    setIsDragging(false);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    try {
      const sent = await sendContactForm(formData);
      if (sent) {
        setSending(false);
        setFormData(initialFormData);
        setShowUI((prev) => ({ ...prev, contact: false }));
      }
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }

  return (
    <Draggable
      handle=".handle"
      defaultPosition={initialPosition}
      position={position}
      grid={[1, 1]}
      scale={1}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
      bounds={{
        left: 0,
        top: -96,
        right: 0.75 * width - 48,
        bottom: height - 64 - 96 * 2,
      }}
    >
      <div className="absolute flex flex-col gap-2 z-50 w-full max-w-[calc(40vw-1rem)] md:max-w-[calc(35vw-1rem)] lg:max-w-[calc(30vw-1rem)] border-2 border-dashed p-4 bg-black/50">
        <div
          className={clsx(
            sending ? "opacity-50" : error ? "opacity-0" : "opacity-100",
            "handle select-none flex w-full justify-between items-center transition-opacity"
          )}
        >
          <div
            className={clsx(
              isDragging ? "cursor-grabbing" : "cursor-grab",
              "text-3xl pl-1"
            )}
          >
            <DragIcon className="hover:text-white text-white/50 transition-opacity" />
          </div>
          <p className="max-w-[200px] lg:max-w-[240px] text-md lg:text-lg leading-[16px] text-thin text-right">
            book me for a live show, or commission a piece.
          </p>
        </div>

        {sending && <Loading />}
        {error && <ErrorMessage setError={setError} />}
        <form
          onSubmit={(event) => handleSubmit(event)}
          className={clsx(
            sending ? "opacity-50" : error ? "opacity-0" : "opacity-100",

            "flex flex-col gap-1 transition-opacity"
          )}
        >
          {fields.map((field) => {
            return (
              <div key={field} className="flex flex-col">
                <label className="text-xs text-mid">{field}</label>
                {field === "message" ? (
                  <textarea
                    required
                    className="w-full min-h-[112px] bg-black/0 border-2 border-dashed border-white p-2 text-light"
                    value={formData[field as keyof typeof formData]}
                    onChange={(event) => {
                      setFormData((prev) => {
                        return {
                          ...prev,
                          [field]: event.target.value,
                        };
                      });
                    }}
                  ></textarea>
                ) : (
                  <input
                    required
                    className="w-full bg-black/0 border-2 border-dashed border-white p-2"
                    type={field === "email" ? "email" : "text"}
                    value={formData[field as keyof typeof formData]}
                    onChange={(event) => {
                      setFormData((prev) => {
                        return {
                          ...prev,
                          [field]: event.target.value,
                        };
                      });
                    }}
                  />
                )}
              </div>
            );
          })}
          <button
            className="text-center text-mid text-xl w-full border-2 border-dashed p-2 mt-2 hover:bg-red/20 active:bg-red/50"
            type="submit"
          >
            send
          </button>
        </form>
      </div>
    </Draggable>
  );
};

export default ContactForm;
