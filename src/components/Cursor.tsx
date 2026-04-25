import { useState, useEffect } from "react";

export function Cursor() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('ltr') ||
        target.classList.contains('stat') ||
        target.classList.contains('why-card') ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea'
      ) {
        setHovered(true);
      }
    };

    const handleMouseOut = () => {
      setHovered(false);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div
      className={`fixed z-[9999] pointer-events-none rounded-full transition-[width,height,background,opacity] duration-150 ease-out mix-blend-difference -translate-x-1/2 -translate-y-1/2 ${
        hovered 
          ? "w-[28px] h-[28px] bg-green opacity-50" 
          : "w-[10px] h-[10px] bg-foreground"
      }`}
      style={{ left: pos.x, top: pos.y }}
    />
  );
}
