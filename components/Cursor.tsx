"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      setHovered(!!(e.target as Element).closest?.("a, button"));
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.15;
      current.y += (target.y - current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${current.x}px, ${current.y}px) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <div
        ref={cursorRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovered ? 40 : 12,
          height: hovered ? 40 : 12,
          borderRadius: "50%",
          background: hovered ? "transparent" : "#F9F200",
          border: hovered ? "1.5px solid #F9F200" : "1.5px solid transparent",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          transition: "width 0.15s ease, height 0.15s ease, background 0.15s ease, border-color 0.15s ease",
        }}
      />
    </>
  );
}
