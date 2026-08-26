import { useContact } from "@/components/hooks/use-contact";
import { useRef } from "react";
import { CtaButton } from "@/components/CtaButton";
import { heroTitleClass, heroTitleSizeContact } from "@/lib/typography";

export default function Contact() {
  const mutation = useContact();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Use native checkValidity browser shows tooltip bubbles automatically
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    mutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <section className="min-h-[100svh]">
      {/* HERO */}
      <div className="cont-hero max-w-[1160px] mx-auto pt-[130px] px-5 md:px-[22px] animate-[fadeUp_0.85s_ease-out_both]">
        <p
          className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-green mb-3.5 animate-[fadeUp_0.85s_0.02s_ease-out_both]"
        >
          Reach Out
        </p>
        <h1
          className={`${heroTitleClass} mb-2.5 animate-[fadeUp_0.85s_0.08s_ease-out_both]`}
          style={heroTitleSizeContact}
        >
          <span className="block text-fg-b">Get In</span>
          <span className="block text-green">Touch</span>
        </h1>
        <p className="font-sans font-light text-fg-m leading-[1.8] text-base animate-[fadeUp_0.85s_0.14s_ease-out_both]">
          Questions about enzymes, bulk orders, or custom formulations? We're here.
        </p>
        <div className="w-10 h-[2px] bg-green mt-5 rounded-[1px] animate-[fadeUp_0.85s_0.2s_ease-out_both]" />
      </div>

      {/* BODY: 2-col, left = ic-grid + map, right = form card */}
      <div className="max-w-[1160px] mx-auto mt-14 mb-20 px-5 md:px-[22px] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 md:items-center animate-[fadeIn_0.9s_0.28s_ease-out_both]">
        {/* LEFT */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3.5">
            {[
              {
                ico: "📞",
                lbl: "Call / WhatsApp",
                val: "+91 93270 28058",
                href: "tel:+919327028058",
              },
              {
                ico: "☎️",
                lbl: "Landline",
                val: "+91 0265 3556167",
                href: "tel:+9102653556167",
              },
              {
                ico: "✉️",
                lbl: "Email",
                val: "info@anselbiotech.in",
                href: "mailto:info@anselbiotech.in",
              },
              {
                ico: "📍",
                lbl: "Address",
                val: "196 GIDC, Makarpura",
                sub: "Vadodara 390014",
              },
              {
                ico: "🕐",
                lbl: "Working Hours",
                val: "Mon to Sat",
                sub: "10:00 AM to 6:00 PM",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-[12px] p-5 transition-all duration-200 hover:border-border-m hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:-translate-y-px cursor-default opacity-0 animate-[cardIn_0.7s_ease-out_both]"
                style={{ animationDelay: `${0.34 + i * 0.08}s` }}
              >
                <div className="text-[1.2rem] mb-2.5">{c.ico}</div>
                <div className="font-mono text-[0.58rem] tracking-[0.16em] uppercase text-fg-m mb-1">
                  {c.lbl}
                </div>
                {c.href ? (
                  <a
                    href={c.href}
                    className="block font-sans text-[0.95rem] font-semibold text-fg-b no-underline transition-colors hover:text-green"
                  >
                    {c.val}
                  </a>
                ) : (
                  <span className="block font-sans text-[0.95rem] font-semibold text-fg-b">
                    {c.val}
                  </span>
                )}
                {c.sub && (
                  <span className="block font-sans text-[0.8rem] font-light text-fg-m leading-[1.65] mt-0.5">
                    {c.sub}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="rounded-[12px] overflow-hidden border border-border h-[270px] bg-bg3 opacity-0 animate-[fadeIn_0.9s_0.62s_ease-out_both]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3693.1817374407633!2d73.17794567537518!3d22.233182345324757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc7bbc612dc0b%3A0xa18aac094a785856!2sAnsel%20Biotech%20-%20Enzymes%20manufacturing%20company!5e0!3m2!1sen!2sin!4v1776837089908!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ansel Biotech Location"
              className="w-full h-full border-0 block"
            />
          </div>
        </div>

        {/* RIGHT Form card */}
        <div className="fc bg-card border border-border border-t-[3px] border-t-green rounded-[14px] p-7 md:p-9 h-fit opacity-0 animate-[fadeUp_0.85s_0.42s_ease-out_both]">
          <div className="flex items-start gap-3.5 mb-6">
            <div className="w-10 h-10 rounded-[10px] bg-[rgba(106,178,32,0.1)] border border-[rgba(106,178,32,0.2)] flex items-center justify-center text-base shrink-0">
              💬
            </div>
            <div>
              <div className="font-sans text-[1.5rem] font-semibold text-fg-b leading-tight">
                Send a Message
              </div>
              <div className="font-mono text-[0.6rem] text-fg-m tracking-[0.06em] mt-1">
                We respond within 24 hours
              </div>
            </div>
          </div>
          {mutation.isSuccess && (
            <div className="mb-4 px-4 py-3 rounded-[7px] bg-[rgba(106,178,32,0.08)] border border-[rgba(106,178,32,0.2)] font-mono text-[0.66rem] tracking-[0.06em] text-green">
              ✓ Message sent! We'll be in touch soon.
            </div>
          )}
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label className="block font-mono text-[0.62rem] tracking-[0.1em] uppercase text-fg-m mb-1.5">
                Full Name <span className="text-[#e05555] ml-0.5">*</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Rajesh Sharma"
                required
                minLength={2}
                className="w-full px-3.5 py-2.5 bg-bg2 border border-border-m rounded-[7px] text-fg-b font-sans text-[0.95rem] outline-none transition-all focus:border-green focus:shadow-[0_0_0_3px_rgba(106,178,32,0.1)] placeholder:text-fg-m placeholder:opacity-50 placeholder:font-light"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-mono text-[0.62rem] tracking-[0.1em] uppercase text-fg-m mb-1.5">
                  Email <span className="text-[#e05555] ml-0.5">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="rajesh@company.com"
                  required
                  className="w-full px-3.5 py-2.5 bg-bg2 border border-border-m rounded-[7px] text-fg-b font-sans text-[0.95rem] outline-none transition-all focus:border-green focus:shadow-[0_0_0_3px_rgba(106,178,32,0.1)] placeholder:text-fg-m placeholder:opacity-50 placeholder:font-light"
                />
              </div>
              <div>
                <label className="block font-mono text-[0.62rem] tracking-[0.1em] uppercase text-fg-m mb-1.5">
                  Phone <span className="text-fg-m text-[0.56rem]">(optional)</span>
                </label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+91 99999 99999"
                  className="w-full px-3.5 py-2.5 bg-bg2 border border-border-m rounded-[7px] text-fg-b font-sans text-[0.95rem] outline-none transition-all focus:border-green focus:shadow-[0_0_0_3px_rgba(106,178,32,0.1)] placeholder:text-fg-m placeholder:opacity-50 placeholder:font-light"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-mono text-[0.62rem] tracking-[0.1em] uppercase text-fg-m mb-1.5">
                Message <span className="text-[#e05555] ml-0.5">*</span>
              </label>
              <textarea
                name="message"
                placeholder="Industry, product type, volume, location…"
                required
                minLength={10}
                className="w-full px-3.5 py-2.5 bg-bg2 border border-border-m rounded-[7px] text-fg-b font-sans text-[0.92rem] leading-[1.65] outline-none transition-all focus:border-green focus:shadow-[0_0_0_3px_rgba(106,178,32,0.1)] resize-none min-h-[128px] placeholder:text-fg-m placeholder:opacity-50 placeholder:font-light"
              />
            </div>
            <CtaButton
              type="submit"
              size="block"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <span>Sending…</span>
                  <span className="inline-block w-3.5 h-3.5 border-[1.5px] border-white/30 border-t-white rounded-full animate-spin" />
                </>
              ) : mutation.isSuccess ? (
                <>
                  <span>Message Sent!</span>
                  <span>✓</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <span>→</span>
                </>
              )}
            </CtaButton>
            <p className="text-center mt-2.5 font-mono text-[0.57rem] text-fg-m opacity-60">
              Fields marked * required
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
