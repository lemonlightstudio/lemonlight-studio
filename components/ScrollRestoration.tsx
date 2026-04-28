"use client";

import { useEffect } from "react";

export default function ScrollRestoration() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedY = sessionStorage.getItem("scrollY");
    if (savedY) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedY));
      }, 100);
    }
    const handleScroll = () => {
      sessionStorage.setItem("scrollY", window.scrollY.toString());
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const opacity = (0.018 - progress * 0.014).toFixed(4);
      document.body.style.setProperty("--grid-opacity", opacity);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return null;
}
