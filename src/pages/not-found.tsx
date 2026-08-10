import { useEffect, useState } from "react";
import { CtaButton } from "@/components/CtaButton";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <style>{`
        @keyframes _404Fade { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
        ._f0 { animation: _404Fade .6s .00s ease both; }
        ._f1 { animation: _404Fade .6s .10s ease both; }
        ._f2 { animation: _404Fade .6s .20s ease both; }
        ._f3 { animation: _404Fade .6s .32s ease both; }
        @keyframes _glitch {
          0%,95%,100% { transform: none; opacity:1; }
          96%  { transform: translate(-2px, 1px) skewX(-1deg); opacity:.8; }
          97%  { transform: translate(2px, -1px) skewX(1deg);  opacity:.9; }
          98%  { transform: translate(-1px, 0);                opacity:.7; }
        }
        ._glitch { animation: _glitch 4s ease infinite; }
        @keyframes _pulse {
          0%,100% { opacity:.3; transform:scale(1); }
          50%     { opacity:.7; transform:scale(1.04); }
        }
        ._orb { animation: _pulse 6s ease-in-out infinite; }
        ._orb2 { animation: _pulse 8s 2s ease-in-out infinite; }
      `}</style>

      <div
        className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-5"
        style={{ background: "var(--bg, #07090f)" }}
      >
        {/* Background orbs */}
        <div
          className="_orb absolute pointer-events-none rounded-full"
          style={{
            width: "clamp(300px, 50vw, 600px)",
            height: "clamp(300px, 50vw, 600px)",
            top: "5%", left: "55%",
            background: "radial-gradient(circle, rgba(106,178,32,0.09), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="_orb2 absolute pointer-events-none rounded-full"
          style={{
            width: "clamp(200px, 35vw, 420px)",
            height: "clamp(200px, 35vw, 420px)",
            bottom: "10%", left: "5%",
            background: "radial-gradient(circle, rgba(58,58,184,0.08), transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-[480px] gap-6">

          {/* 404 number */}
          <div className="_f0">
            <span
              className="_glitch font-serif font-bold text-green select-none block"
              style={{
                fontSize: "clamp(6rem, 20vw, 11rem)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                textShadow: "0 0 60px rgba(106,178,32,0.25)",
              }}
            >
              404
            </span>
          </div>

          {/* Divider */}
          <div
            className="_f1 h-[1px] w-20"
            style={{ background: "linear-gradient(to right, transparent, rgba(106,178,32,0.5), transparent)" }}
          />

          {/* Heading */}
          <div className="_f1">
            <p className="font-mono text-[0.62rem] tracking-[0.24em] uppercase text-green mb-3">
              Page Not Found
            </p>
            <h1
              className="font-serif font-bold text-fg-b leading-[1.05]"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "var(--fg-b, #edf4e5)" }}
            >
              This strand doesn't exist
            </h1>
          </div>

          {/* Subtitle */}
          <p
            className="_f2 font-sans font-light leading-[1.8] text-[0.96rem]"
            style={{ color: "var(--fg-m, #536050)" }}
          >
            The page you're looking for may have been moved, renamed, or doesn't exist.
            Let's get you back on the right sequence.
          </p>

          {/* Code badge */}
          <div
            className="_f2 inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] border font-mono text-[0.6rem] tracking-[0.1em] uppercase"
            style={{
              background: "rgba(106,178,32,0.06)",
              borderColor: "rgba(106,178,32,0.2)",
              color: "var(--fg-m, #536050)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green opacity-70" style={{ animation: "_pulse 2s infinite" }} />
            Error 404 · Route not matched
          </div>

          {/* CTAs */}
          <div className="_f3 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <CtaButton href="/" className="w-full sm:w-auto">
              ← Back to Home
            </CtaButton>
            <CtaButton href="/products" variant="secondary" className="w-full sm:w-auto">
              Browse Products
            </CtaButton>
          </div>
        </div>

        {/* Bottom watermark */}
        <div
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          style={{ opacity: mounted ? 1 : 0, transition: "opacity .4s .6s" }}
        >
          <span
            className="font-mono text-[0.52rem] tracking-[0.18em] uppercase"
            style={{ color: "var(--fg-m, #536050)", opacity: 0.3 }}
          >
            Ansel Biotech · anselbiotech.in
          </span>
        </div>
      </div>
    </>
  );
}