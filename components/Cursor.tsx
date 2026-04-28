"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const target  = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
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

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
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
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#F9F200",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
        }}
      />
    </>
  );
}
