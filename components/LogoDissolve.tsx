"use client";

import { useRef, useCallback } from "react";

const BLOCK        = 8;
const ANIM_DUR     = 300;  // ms per block after delay
const MAX_DELAY    = 200;  // ms max stagger

type Block = {
  sx: number; sy: number;  // top-left in image space
  tx: number; ty: number;  // dissolve displacement
  delay: number;
};

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export default function LogoDissolve() {
  const imgRef    = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blocksRef = useRef<Block[]>([]);
  const rafRef    = useRef<number>(0);
  const startRef  = useRef<number>(0);
  const modeRef   = useRef<"dissolve" | "assemble" | "idle">("idle");

  const buildBlocks = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    const w    = img.offsetWidth;
    const h    = img.offsetHeight;
    const cols = Math.ceil(w / BLOCK);
    const rows = Math.ceil(h / BLOCK);
    blocksRef.current = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const angle = Math.random() * Math.PI * 2;
        const dist  = 12 + Math.random() * 22;
        blocksRef.current.push({
          sx: c * BLOCK, sy: r * BLOCK,
          tx: Math.cos(angle) * dist,
          ty: Math.sin(angle) * dist,
          delay: Math.random() * MAX_DELAY,
        });
      }
    }
  }, []);

  const render = useCallback((now: number) => {
    const canvas = canvasRef.current;
    const img    = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const elapsed    = now - startRef.current;
    const dissolving = modeRef.current === "dissolve";
    let   allDone    = true;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const b of blocksRef.current) {
      const raw   = (elapsed - b.delay) / ANIM_DUR;
      const t     = Math.max(0, Math.min(1, raw));
      if (t < 1) allDone = false;

      const e     = easeInOut(t);
      const ox    = dissolving ? b.tx * e       : b.tx * (1 - e);
      const oy    = dissolving ? b.ty * e       : b.ty * (1 - e);
      const alpha = dissolving ? 1 - e          : e;

      if (alpha <= 0.01) continue;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, b.sx, b.sy, BLOCK, BLOCK, b.sx + ox, b.sy + oy, BLOCK, BLOCK);
    }

    ctx.globalAlpha = 1;

    if (!allDone) {
      rafRef.current = requestAnimationFrame(render);
    } else if (modeRef.current === "assemble") {
      canvas.style.opacity = "0";
      if (imgRef.current) imgRef.current.style.opacity = "1";
      modeRef.current = "idle";
    }
  }, []);

  const onEnter = useCallback(() => {
    const canvas = canvasRef.current;
    const img    = imgRef.current;
    if (!canvas || !img) return;

    cancelAnimationFrame(rafRef.current);

    const w = img.offsetWidth;
    const h = img.offsetHeight;
    canvas.width        = w;
    canvas.height       = h;
    canvas.style.width  = `${w}px`;
    canvas.style.height = `${h}px`;
    canvas.style.opacity = "1";
    img.style.opacity    = "0";

    buildBlocks();
    modeRef.current  = "dissolve";
    startRef.current = performance.now();
    rafRef.current   = requestAnimationFrame(render);
  }, [buildBlocks, render]);

  const onLeave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    cancelAnimationFrame(rafRef.current);
    canvas.style.opacity = "1";
    modeRef.current  = "assemble";
    startRef.current = performance.now();
    rafRef.current   = requestAnimationFrame(render);
  }, [render]);

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src="/Logos/lemonlight_secondary_logo.png"
        alt="lemonlight studio"
        style={{ width: "180px", height: "auto", display: "block", transition: "opacity 0.05s" }}
      />
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, opacity: 0, pointerEvents: "none" }}
      />
    </div>
  );
}
