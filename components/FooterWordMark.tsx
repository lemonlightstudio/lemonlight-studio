"use client";

import { useRef, useEffect } from "react";

const BLOCK     = 6;
const MAX_DELAY = 400;  // ms max stagger
const MAX_DIST  = 40;   // px max displacement
const T_VIS     = 4000; // ms visible
const T_DIS     = 800;  // ms dissolve
const T_INV     = 300;  // ms invisible
const T_ASM     = 800;  // ms assemble

type Block = { x: number; y: number; tx: number; ty: number; delay: number };

function ease(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export default function FooterWordMark() {
  const textRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef    = useRef<HTMLImageElement | null>(null);
  const blocksRef = useRef<Block[]>([]);

  useEffect(() => {
    const textEl = textRef.current;
    const canvas = canvasRef.current;
    if (!textEl || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let timer: ReturnType<typeof setTimeout>;

    // ── helpers ──────────────────────────────────────────────────

    const syncSize = () => {
      const w = textEl.offsetWidth;
      const h = textEl.offsetHeight;
      canvas.width        = w;
      canvas.height       = h;
      canvas.style.height = `${h}px`;
    };

    const drawTextToCanvas = () => {
      syncSize();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const fs = parseFloat(getComputedStyle(textEl).fontSize) || 80;
      ctx.font         = `900 ${fs}px Inter, sans-serif`;
      ctx.textBaseline = "middle";
      ctx.textAlign    = "left";

      const lemon  = "lemon";
      const light  = "light.";
      const lemonW = ctx.measureText(lemon).width;
      const lightW = ctx.measureText(light).width;
      const sx     = (canvas.width - lemonW - lightW) / 2;
      const sy     = canvas.height / 2;

      ctx.fillStyle = "#ffffff";
      ctx.fillText(lemon, sx, sy);
      ctx.fillStyle = "#F9F200";
      ctx.fillText(light, sx + lemonW, sy);
    };

    const captureAndBuild = () => {
      drawTextToCanvas();

      // Save snapshot as Image for block rendering
      const snap = new Image();
      snap.src = canvas.toDataURL();
      imgRef.current = snap;

      // Find non-empty blocks
      const data  = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const cols  = Math.ceil(canvas.width  / BLOCK);
      const rows  = Math.ceil(canvas.height / BLOCK);
      const list: Block[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let hit = false;
          outer:
          for (let dy = 0; dy < BLOCK; dy++) {
            for (let dx = 0; dx < BLOCK; dx++) {
              const px = c * BLOCK + dx;
              const py = r * BLOCK + dy;
              if (px >= canvas.width || py >= canvas.height) continue;
              if (data[(py * canvas.width + px) * 4 + 3] > 10) { hit = true; break outer; }
            }
          }
          if (!hit) continue;

          const angle = Math.random() * Math.PI * 2;
          const dist  = 12 + Math.random() * (MAX_DIST - 12);
          list.push({
            x: c * BLOCK, y: r * BLOCK,
            tx: Math.cos(angle) * dist,
            ty: Math.sin(angle) * dist,
            delay: Math.random() * MAX_DELAY,
          });
        }
      }
      blocksRef.current = list;
    };

    const renderBlocks = (elapsed: number, dissolving: boolean) => {
      const img = imgRef.current;
      if (!img) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dur = (dissolving ? T_DIS : T_ASM) - MAX_DELAY;

      for (const b of blocksRef.current) {
        const raw   = Math.max(0, Math.min(1, (elapsed - b.delay) / dur));
        const e     = ease(raw);
        const ox    = dissolving ? b.tx * e       : b.tx * (1 - e);
        const oy    = dissolving ? b.ty * e       : b.ty * (1 - e);
        const alpha = dissolving ? 1 - e          : e;
        if (alpha < 0.01) continue;
        ctx.globalAlpha = alpha;
        ctx.drawImage(img, b.x, b.y, BLOCK, BLOCK, b.x + ox, b.y + oy, BLOCK, BLOCK);
      }
      ctx.globalAlpha = 1;
    };

    // ── cycle ────────────────────────────────────────────────────

    const startAssemble = () => {
      canvas.style.opacity = "1";
      const t0 = performance.now();

      const tick = (now: number) => {
        const el = now - t0;
        renderBlocks(el, false);
        if (el < T_ASM) {
          rafId = requestAnimationFrame(tick);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          canvas.style.opacity = "0";
          textEl.style.opacity = "1";
          // wait T_VIS then dissolve again
          timer = setTimeout(startDissolve, T_VIS);
        }
      };
      rafId = requestAnimationFrame(tick);
    };

    const startDissolve = () => {
      captureAndBuild();
      textEl.style.opacity = "0";
      canvas.style.opacity = "1";
      const t0 = performance.now();

      const tick = (now: number) => {
        const el = now - t0;
        renderBlocks(el, true);
        if (el < T_DIS) {
          rafId = requestAnimationFrame(tick);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          canvas.style.opacity = "0";
          // invisible phase then assemble
          timer = setTimeout(startAssemble, T_INV);
        }
      };
      rafId = requestAnimationFrame(tick);
    };

    // Kick off after initial visible period
    timer = setTimeout(startDissolve, T_VIS);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", marginBottom: "48px" }}>
      {/* Text */}
      <div
        ref={textRef}
        style={{
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(48px, 8vw, 120px)",
          letterSpacing: "-0.02em",
          textAlign: "center",
          width: "100%",
          lineHeight: 1.1,
          userSelect: "none",
          transition: "opacity 0.15s ease",
        }}
      >
        <span style={{ color: "#ffffff" }}>lemon</span>
        <span style={{ color: "#F9F200" }}>light.</span>
      </div>

      {/* Canvas overlay */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          pointerEvents: "none",
          opacity: 0,
        }}
      />
    </div>
  );
}
