import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { insertContactInquirySchema } from "@shared/schema";
import emailjs from "@emailjs/browser";
import { EMAILJS } from "@/lib/emailjs";

export type ContactInquiryInput = z.infer<typeof insertContactInquirySchema>;

export function useContact() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutate = async (
    data: ContactInquiryInput,
    options?: { onSuccess?: () => void }
  ) => {
    setIsPending(true);
    setIsSuccess(false);

    try {
      const result = await emailjs.send(
        EMAILJS.contact.serviceId,
        EMAILJS.contact.templateId,
        {
          name: data.name,
          email: data.email,
          phone: data.phone || "Not provided",
          message: data.message,
        },
        EMAILJS.publicKey
      );

      if (result.text === "OK") {
        setIsSuccess(true);
        toast({
          title: "Message Sent! ✓",
          description:
            "We've received your inquiry and will get back to you within 24 hours.",
        });
        options?.onSuccess?.();
      }
    } catch (error) {
      console.error("EmailJS Contact Error:", error);
      toast({
        title: "Failed to Send",
        description:
          "Something went wrong. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending, isSuccess };
}
