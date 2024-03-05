import { FormDataType } from "@/components/layout/ContactForm";

export async function sendContactForm(data: FormDataType) {
  try {
    const res = fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (res) {
      const response = await Promise.resolve(res);
      return response.json();
    }
  } catch (error) {
    throw new Error("Failed to send message");
  }
}
