import { useEffect, useRef, useState } from "react";
import { CtaButton } from "@/components/CtaButton";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
export interface QuoteProduct {
    code: string;
    enzyme: string;
    application: string;
    icon?: string;
}

interface Props {
    product: QuoteProduct | null;
    onClose: () => void;
}

/* ─────────────────────────────────────────
   Country codes (top picks + full list)
───────────────────────────────────────── */
const COUNTRY_CODES = [
    { code: "+91", flag: "🇮🇳", name: "India" },
    { code: "+1", flag: "🇺🇸", name: "USA" },
    { code: "+44", flag: "🇬🇧", name: "UK" },
    { code: "+971", flag: "🇦🇪", name: "UAE" },
    { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
    { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
    { code: "+92", flag: "🇵🇰", name: "Pakistan" },
    { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
    { code: "+60", flag: "🇲🇾", name: "Malaysia" },
    { code: "+62", flag: "🇮🇩", name: "Indonesia" },
    { code: "+65", flag: "🇸🇬", name: "Singapore" },
    { code: "+49", flag: "🇩🇪", name: "Germany" },
    { code: "+33", flag: "🇫🇷", name: "France" },
    { code: "+86", flag: "🇨🇳", name: "China" },
    { code: "+81", flag: "🇯🇵", name: "Japan" },
    { code: "+82", flag: "🇰🇷", name: "South Korea" },
    { code: "+55", flag: "🇧🇷", name: "Brazil" },
    { code: "+27", flag: "🇿🇦", name: "South Africa" },
    { code: "+234", flag: "🇳🇬", name: "Nigeria" },
    { code: "+20", flag: "🇪🇬", name: "Egypt" },
];

const QUICK_QTY = [
    { label: "100 kg", val: "100" },
    { label: "500 kg", val: "500" },
    { label: "1 T", val: "1000" },
    { label: "5 T", val: "5000" },
];

type Status = "idle" | "submitting" | "success";

/* ─────────────────────────────────────────
   Modal
───────────────────────────────────────── */
export function RequestQuoteModal({ product, onClose }: Props) {
    const [qty, setQty] = useState("");
    const [details, setDetails] = useState("");
    const [cc, setCc] = useState("+91");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const overlayRef = useRef<HTMLDivElement>(null);
    const firstInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    /* Reset state every time product changes */
    useEffect(() => {
        if (product) {
            setQty(""); setDetails(""); setPhone(""); setStatus("idle");
            setTimeout(() => firstInputRef.current?.focus(), 120);
        }
    }, [product]);

    /* ESC to close */
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [onClose]);

    /* Lock body scroll while open */
    useEffect(() => {
        if (product) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [product]);

    if (!product) return null;


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        // Native validation trigger
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        setStatus("submitting");

        await new Promise((r) => setTimeout(r, 1600));
        setStatus("success");
    };

    const selectedFlag = COUNTRY_CODES.find((c) => c.code === cc)?.flag ?? "🌐";

    return (
        <>
            <style>{`
        @keyframes _mSlide {
          from { opacity:0; transform:translateY(18px) scale(0.98); }
          to   { opacity:1; transform:none; }
        }
        ._mSlide { animation: _mSlide .3s cubic-bezier(.34,1.1,.64,1) both; }

        @keyframes _mFade { from{opacity:0} to{opacity:1} }
        ._mFade { animation: _mFade .22s ease both; }

        /* Success tick */
        @keyframes _tick {
          from { stroke-dashoffset: 40; opacity:0; }
          to   { stroke-dashoffset: 0;  opacity:1; }
        }
        ._tick { stroke-dasharray:40; animation: _tick .5s .2s ease both; }

        .rq-input {
          width:100%;
          padding: 10px 13px;
          background: var(--inp, rgba(255,255,255,0.04));
          border: 1px solid var(--bdr-m, rgba(216,226,208,0.13));
          border-radius: 8px;
          color: var(--fg-b, #edf4e5);
          font-family: inherit;
          font-size: 0.92rem;
          outline: none;
          transition: border-color .18s, box-shadow .18s;
        }
        .rq-input:focus {
          border-color: var(--green, #6ab220);
          box-shadow: 0 0 0 3px rgba(106,178,32,0.10);
        }
        .rq-input::placeholder { color: var(--fg-m, #536050); opacity:.55; }
        .rq-label {
          display:block;
          font-family: var(--font-sans);
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--fg-m, #536050);
          margin-bottom: 6px;
          opacity: 0.7;
        }
        .rq-label .req { color:#e05555; margin-left:2px; }
      `}</style>

            {/* Overlay */}
            <div
                ref={overlayRef}
                className="_mFade fixed inset-0 z-[200] flex items-end sm:items-center justify-center px-0 sm:px-4"
                style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(5px)" }}
                onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
            >
                {/* Modal panel */}
                <div
                    className="_mSlide relative w-full sm:max-w-[560px] rounded-t-[24px] sm:rounded-[20px] bg-card border border-border flex flex-col overflow-hidden"
                    style={{
                        maxHeight: "92svh",
                        boxShadow: "0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(106,178,32,0.10)",
                    }}
                >
                    {/* ── Header ── */}
                    <div
                        className="flex items-start justify-between gap-4 px-6 pt-6 pb-5 border-b border-border flex-shrink-0"
                        style={{ background: "rgba(106,178,32,0.04)" }}
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            {/* Product icon */}
                            <div
                                className="w-11 h-11 rounded-[10px] border border-[rgba(106,178,32,0.25)] bg-[rgba(106,178,32,0.08)] flex items-center justify-center text-xl flex-shrink-0"
                            >
                                {product.icon ?? "🧪"}
                            </div>
                            <div className="min-w-0">
                                <div className="font-mono text-[0.54rem] tracking-[0.14em] uppercase text-green opacity-80 mb-0.5 truncate">
                                    {product.code}
                                </div>
                                <h2 className="font-sans font-bold text-fg-b leading-[1.1] truncate" style={{ fontSize: "1.15rem" }}>
                                    {product.enzyme}
                                </h2>
                                <div className="font-mono text-[0.52rem] tracking-[0.1em] uppercase text-fg-m opacity-50 mt-0.5 truncate">
                                    {product.application}
                                </div>
                            </div>
                        </div>

                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center font-mono text-[0.7rem] text-fg-m hover:border-green hover:text-green transition-colors mt-0.5"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>

                    {/* ── Scrollable body ── */}
                    <div className="overflow-y-auto flex-1">
                        {status === "success" ? (
                            /* ── SUCCESS STATE ── */
                            <div className="flex flex-col items-center justify-center gap-5 px-6 py-14 text-center">
                                {/* Animated tick */}
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{ background: "rgba(106,178,32,0.10)", border: "2px solid rgba(106,178,32,0.3)" }}
                                >
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                                        <polyline
                                            className="_tick"
                                            points="5,15 12,22 25,8"
                                            stroke="var(--green, #6ab220)"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            fill="none"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-sans font-bold text-fg-b text-[1.25rem] mb-2">
                                        Request Received!
                                    </h3>
                                    <p className="font-sans font-light text-fg-m text-[0.92rem] leading-[1.75] max-w-[340px]">
                                        Our team will review your requirement for{" "}
                                        <span className="text-green font-medium">{product.enzyme}</span> and get back
                                        to you within <span className="text-fg-b font-medium">48 hours</span>.
                                    </p>
                                </div>
                                <CtaButton onClick={onClose} size="sm" className="mt-2">
                                    Done
                                </CtaButton>
                            </div>
                        ) : (
                            /* ── FORM ── */
                            <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 px-6 py-6">

                                {/* Quantity */}
                                <div>
                                    <label className="rq-label">
                                        Quantity Required <span className="req">*</span>
                                    </label>

                                    {/* Quick quantity chips */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {QUICK_QTY.map((q) => (
                                            <button
                                                key={q.val}
                                                type="button"
                                                onClick={() => setQty(q.val)}
                                                className={`font-mono text-[0.58rem] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border transition-all ${qty === q.val
                                                    ? "border-green bg-[rgba(106,178,32,0.1)] text-green"
                                                    : "border-border text-fg-m hover:border-[rgba(106,178,32,0.4)] hover:text-green"
                                                    }`}
                                            >
                                                {q.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Input with kg unit */}
                                    <div className="relative flex items-center">
                                        <input
                                            ref={firstInputRef}
                                            name="qty"
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[1-9][0-9]{2,}"  // 100+
                                            required
                                            placeholder="Minimum 100"
                                            value={qty}
                                            onChange={(e) => setQty(e.target.value.replace(/\D/g, ""))}
                                            className="rq-input pr-14"
                                            onInvalid={(e) => {
                                                if (!e.currentTarget.value) {
                                                    e.currentTarget.setCustomValidity("Please enter quantity");
                                                } else {
                                                    e.currentTarget.setCustomValidity("Minimum order is 100 kg");
                                                }
                                            }}
                                            onInput={(e) => e.currentTarget.setCustomValidity("")}
                                        />
                                        <div
                                            className="absolute right-0 top-0 bottom-0 flex items-center px-3.5 rounded-r-[8px] border-l border-border pointer-events-none"
                                            style={{ background: "rgba(106,178,32,0.06)" }}
                                        >
                                            <span className="font-mono text-[0.62rem] tracking-[0.1em] uppercase text-green font-medium">
                                                kg
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional details */}
                                <div>
                                    <label className="rq-label">Additional Details</label>
                                    <textarea
                                        placeholder="Describe your process, application, purity requirements, delivery timeline or any other details that help us serve you better..."
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                        rows={3}
                                        className="rq-input resize-none leading-[1.65]"
                                        style={{ minHeight: 90 }}
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="rq-label">
                                        Mobile Number <span className="req">*</span>
                                    </label>
                                    <div className="flex gap-2">
                                        {/* Country code selector */}
                                        <div className="relative flex-shrink-0">
                                            <select
                                                value={cc}
                                                onChange={(e) => setCc(e.target.value)}
                                                className="rq-input appearance-none pl-8 pr-7 cursor-pointer"
                                                style={{ width: 110 }}
                                            >
                                                {COUNTRY_CODES.map((c) => (
                                                    <option key={c.code + c.name} value={c.code}>
                                                        {c.flag} {c.code}
                                                    </option>
                                                ))}
                                            </select>
                                            {/* Flag overlay */}
                                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-base pointer-events-none leading-none">
                                                {selectedFlag}
                                            </span>
                                            {/* Chevron */}
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green pointer-events-none text-[0.7rem] font-semibold">
                                                ▼
                                            </span>
                                        </div>

                                        {/* Number */}
                                        <input
                                            name="phone"
                                            type="tel"
                                            inputMode="numeric"
                                            required
                                            pattern="[0-9]{7,12}"
                                            placeholder="9876543210"
                                            value={phone}
                                            maxLength={10}
                                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                                            className="rq-input flex-1"
                                            onInvalid={(e) => {
                                                if (!e.currentTarget.value) {
                                                    e.currentTarget.setCustomValidity("Please enter mobile number");
                                                } else {
                                                    e.currentTarget.setCustomValidity("Enter a valid 10-digit mobile number");
                                                }
                                            }}
                                            onInput={(e) => e.currentTarget.setCustomValidity("")}
                                        />
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-[1px] bg-border" />

                                {/* Submit */}
                                <CtaButton
                                    type="submit"
                                    size="block"
                                    disabled={status === "submitting"}
                                >
                                    {status === "submitting" ? (
                                        <>
                                            <span
                                                className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white flex-shrink-0"
                                                style={{ animation: "spin .7s linear infinite" }}
                                            />
                                            Sending Request…
                                        </>
                                    ) : (
                                        <>
                                            Send Quote Request
                                            <span>→</span>
                                        </>
                                    )}
                                </CtaButton>

                                <p className="font-mono text-[0.54rem] tracking-[0.08em] text-fg-m opacity-45 text-center leading-[1.6]">
                                    Fields marked <span className="text-red-400">*</span> are required.
                                    We respond within 48 hours.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div >
        </>
    );
}