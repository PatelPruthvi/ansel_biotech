/**
 * EmailJS config — IDs come from Vite env (`VITE_EMAILJS_*`).
 *
 * Setup:
 *   1. Copy `.env.example` → `.env`
 *   2. Paste real Service / Template / Public Key IDs into `.env`
 *   3. Restart the dev server
 *
 * Templates to paste in the EmailJS dashboard:
 *   email-templates/contact-form.html
 *   email-templates/quote-request-form.html
 */
function env(key: string, fallback = ""): string {
  const value = import.meta.env[key];
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

export const EMAILJS = {
  publicKey: env("VITE_EMAILJS_PUBLIC_KEY"),

  contact: {
    serviceId: env("VITE_EMAILJS_CONTACT_SERVICE_ID"),
    templateId: env("VITE_EMAILJS_CONTACT_TEMPLATE_ID"),
  },

  quote: {
    serviceId: env("VITE_EMAILJS_QUOTE_SERVICE_ID"),
    templateId: env("VITE_EMAILJS_QUOTE_TEMPLATE_ID"),
  },
} as const;
