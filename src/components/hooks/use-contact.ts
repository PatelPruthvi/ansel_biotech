import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { insertContactInquirySchema } from "@shared/schema";
import emailjs from '@emailjs/browser';

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
            // Send via EmailJS
            const result = await emailjs.send(
                'service_xx0xxxx',// FIXME: service ID
                'template_x0xxx3x',// FIXME: template ID
                {
                    name: data.name,
                    email: data.email,
                    phone: data.phone || 'Not provided',
                    message: data.message,
                },
                '5khoTuzwUSQPecZhL'
            );

            if (result.text === 'OK') {
                setIsSuccess(true);
                toast({
                    title: "Message Sent! ✓",
                    description: "We've received your inquiry and will get back to you within 24 hours.",
                });
                options?.onSuccess?.();
            }
        } catch (error) {
            console.error('EmailJS Error:', error);
            toast({
                title: "Failed to Send",
                description: "Something went wrong. Please try again or call us directly.",
                variant: "destructive",
            });
        } finally {
            setIsPending(false);
        }
    };

    return { mutate, isPending, isSuccess };
}