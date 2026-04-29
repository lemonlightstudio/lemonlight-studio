"use client";

import { useEffect, useRef } from "react";

const GRID_SIZE  = 48;
const TRAIL_LEN  = 6;
const PROXIMITY  = 120;

type Direction = "right" | "down";

type Pt = {
  x: number; y: number;
  targetX: number; targetY: number;
  direction: Direction;
  progress: number;
  speed: number;
  cellsMoved: number;
  maxCells: number;
  opacity: number;
  trail: { x: number; y: number }[];
  ignitionTriggered: boolean;
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randInt(min: number, max: number) {
  return Math.floor(rand(min, max + 1));
}

function spawn(cols: number, rows: number): Pt {
  const fromLeft = Math.random() < 0.5;
  let x: number, y: number, dir: Direction;

  if (fromLeft) {
    x   = 0;
    y   = randInt(1, rows - 1) * GRID_SIZE;
    dir = "right";
  } else {
    x   = randInt(1, cols - 1) * GRID_SIZE;
    y   = 0;
    dir = "down";
  }

  return {
    x, y,
    targetX: x + (dir === "right" ? GRID_SIZE : 0),
    targetY: y + (dir === "down"  ? GRID_SIZE : 0),
    direction: dir,
    progress: 0,
    speed: rand(3, 4),
    cellsMoved: 0,
    maxCells: randInt(8, 12),
    opacity: 1,
    trail: [],
    ignitionTriggered: false,
  };
}

function advance(p: Pt, w: number, h: number): void {
  const alt: Direction = p.direction === "right" ? "down" : "right";
  const turn = Math.random() < 0.3;

  const tryDir = (d: Direction): boolean => {
    const nx = p.x + (d === "right" ? GRID_SIZE : 0);
    const ny = p.y + (d === "down"  ? GRID_SIZE : 0);
    if (nx >= 0 && nx <= w && ny >= 0 && ny <= h) {
      p.direction = d;
      p.targetX   = nx;
      p.targetY   = ny;
      p.progress  = 0;
      return true;
    }
    return false;
  };

  if (turn) {
    if (!tryDir(alt)) tryDir(p.direction);
  } else {
    if (!tryDir(p.direction)) tryDir(alt);
  }
}

function getTargetCenter(): { cx: number; cy: number } | null {
  const el = document.querySelector("[data-ignition-target]");
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
}

export default function GridIgnition() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0, rows = 0;
    let pt: Pt | null = null;
    let rafId = 0;
    let spawnTimer: ReturnType<typeof setTimeout>;
    let last = performance.now();

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width  / GRID_SIZE);
      rows = Math.floor(canvas.height / GRID_SIZE);
    };
    resize();
    window.addEventListener("resize", resize);

    const scheduleSpawn = () => {
      spawnTimer = setTimeout(() => {
        pt = spawn(cols, rows);
      }, rand(4000, 6000));
    };

    pt = spawn(cols, rows);

    const animate = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (pt) {
        const p = pt;

        if (p.cellsMoved >= p.maxCells) {
          // Fade out
          p.opacity -= 0.018;
          if (p.opacity <= 0) {
            pt = null;
            scheduleSpawn();
          }
        } else {
          // Move
          p.progress += dt * p.speed;

          if (p.progress >= 1) {
            p.trail.push({ x: p.x, y: p.y });
            if (p.trail.length > TRAIL_LEN) p.trail.shift();
            p.x = p.targetX;
            p.y = p.targetY;
            p.cellsMoved++;
            if (p.cellsMoved < p.maxCells) advance(p, canvas.width, canvas.height);
            p.progress = 0;
          }
        }

        if (pt) {
          const t   = Math.min(p.progress, 1);
          const drawX = p.x + (p.targetX - p.x) * t;
          const drawY = p.y + (p.targetY - p.y) * t;

          // Proximity → ignition
          if (!p.ignitionTriggered) {
            const tgt = getTargetCenter();
            if (tgt) {
              const dx = drawX - tgt.cx;
              const dy = drawY - tgt.cy;
              if (Math.sqrt(dx * dx + dy * dy) <= PROXIMITY) {
                p.ignitionTriggered = true;
                window.dispatchEvent(new CustomEvent("ignition"));
              }
            }
          }

          // Trail
          for (let i = 0; i < p.trail.length; i++) {
            const a = ((i + 1) / p.trail.length) * 0.5 * p.opacity;
            ctx.beginPath();
            ctx.arc(p.trail[i].x, p.trail[i].y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(249,242,0,${a.toFixed(3)})`;
            ctx.fill();
          }

          // Point
          ctx.beginPath();
          ctx.arc(drawX, drawY, 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(249,242,0,${(0.85 * p.opacity).toFixed(3)})`;
          ctx.fill();
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(spawnTimer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
