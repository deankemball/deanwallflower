import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { ShowUIType } from "@/app/layout";
import { sendContactForm } from "@/lib/api";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import InstagramIcon from "@/public/icons/InstagramIcon.svg";

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
      x: width < 1020 ? width * 0.5 : width * 0.7,
      y: height * 0.08,
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
    <div className="absolute left-8 right-8 top-[76px] bottom-[158px] ">
      <div className="relative flex flex-col h-full flex-1 justify-around">
        {sending && <Loading />}
        {error && <ErrorMessage setError={setError} />}
        <form
          onSubmit={(event) => handleSubmit(event)}
          className={clsx(
            sending ? "opacity-50" : error ? "opacity-0" : "opacity-100",

            "flex flex-col gap-1 transition-opacity border-2 border-dashed p-4 bg-black/50"
          )}
        >
          <div className="flex flex-col w-full justify-end">
            <a
              href="https://www.instagram.com/deanwallflower/"
              className="flex w-full justify-between text-md text-mid leading-[18px]"
            >
              <span>
                contact me on instagram <br />
                or via the form below
              </span>
              <InstagramIcon className="text-white text-2xl" />
            </a>
          </div>
          {fields.map((field) => {
            return (
              <div key={field} className="flex flex-col">
                <label className="text-light">{field}</label>
                {field === "message" ? (
                  <textarea
                    required
                    className="w-full flex-grow min-h-[72px] bg-black/0 border-2 border-dashed border-white p-2"
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
            className="text-mid text-lg text-center w-full border-2 border-dashed p-2 mt-2 hover:bg-red/20 active:bg-red/50"
            type="submit"
          >
            send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
