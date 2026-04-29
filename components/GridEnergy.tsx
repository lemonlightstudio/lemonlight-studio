"use client";

import { useEffect, useRef } from "react";

const GRID = 48;
const MAX_SEGMENTS = 6;
const MOVE_INTERVAL = 380; // ms
const FADE_PER_FRAME = 0.06;

type Dir = "left" | "right" | "up" | "down";

type Segment = {
  x1: number; y1: number;
  x2: number; y2: number;
  opacity: number;
};

type Point = {
  x: number;
  y: number;
  direction: Dir;
  segments: Segment[];
};

const DIRS: Dir[] = ["left", "right", "up", "down"];

function randomDir(): Dir {
  return DIRS[Math.floor(Math.random() * DIRS.length)];
}

function nextPos(x: number, y: number, dir: Dir): { nx: number; ny: number } {
  switch (dir) {
    case "right": return { nx: x + GRID, ny: y };
    case "left":  return { nx: x - GRID, ny: y };
    case "down":  return { nx: x,        ny: y + GRID };
    case "up":    return { nx: x,        ny: y - GRID };
  }
}

function wrap(nx: number, ny: number, w: number, h: number): { wx: number; wy: number } {
  let wx = nx;
  let wy = ny;
  if (wx < 0)  wx = Math.floor(w / GRID) * GRID;
  if (wx > w)  wx = 0;
  if (wy < 0)  wy = Math.floor(h / GRID) * GRID;
  if (wy > h)  wy = 0;
  return { wx, wy };
}

function spawnPoint(w: number, h: number): Point {
  const rows = Math.floor(h / GRID);
  const y = Math.floor(Math.random() * rows) * GRID;
  return { x: 0, y, direction: "right", segments: [] };
}

function checkIgnition(x: number, y: number): void {
  const el = document.getElementById("zundet-word");
  if (!el) return;
  const r = el.getBoundingClientRect();
  if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
    window.dispatchEvent(new CustomEvent("zundet-ignite"));
  }
}

export default function GridEnergy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width  = w;
    canvas.height = h;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width  = w;
      canvas.height = h;
    };
    window.addEventListener("resize", resize);

    let pt: Point = spawnPoint(w, h);

    // Movement on interval
    const moveId = setInterval(() => {
      const { nx, ny } = nextPos(pt.x, pt.y, pt.direction);
      const { wx, wy } = wrap(nx, ny, w, h);

      // Add segment from old → new position
      pt.segments.push({ x1: pt.x, y1: pt.y, x2: wx, y2: wy, opacity: 0.5 });
      if (pt.segments.length > MAX_SEGMENTS) pt.segments.shift();

      pt.x = wx;
      pt.y = wy;

      // 25% chance to change direction
      if (Math.random() < 0.25) {
        pt.direction = randomDir();
      }

      // Check proximity to ZÜNDET
      checkIgnition(pt.x, pt.y);
    }, MOVE_INTERVAL);

    // Drawing on RAF
    let rafId = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Fade and draw segments
      pt.segments = pt.segments.filter(s => s.opacity > 0);
      for (const seg of pt.segments) {
        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
        ctx.strokeStyle = `rgba(249,242,0,${seg.opacity.toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        ctx.stroke();
        seg.opacity = Math.max(0, seg.opacity - FADE_PER_FRAME);
      }

      // Draw point
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(249,242,0,0.9)";
      ctx.fill();

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      clearInterval(moveId);
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
