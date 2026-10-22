import { useEffect, useRef, type CSSProperties } from "react";
import { siteConfig } from "../data/siteConfig";
import { useLanguage } from "../i18n/LanguageContext";
import { Icon } from "./Icon";

/** Stylised, faceless executive bust (suit, shirt, tie) drawn in SVG; colours come from theme tokens. */
function ExecutiveFigure() {
  return (
    <svg className="hv-figure" viewBox="0 0 300 380" aria-hidden="true">
      <defs>
        <linearGradient id="hv-suit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--hv-suit-1)" />
          <stop offset="1" stopColor="var(--hv-suit-2)" />
        </linearGradient>
        <linearGradient id="hv-lapel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--hv-lapel-1)" />
          <stop offset="1" stopColor="var(--hv-suit-2)" />
        </linearGradient>
        <radialGradient id="hv-skin" cx="0.36" cy="0.3" r="0.8">
          <stop offset="0" stopColor="var(--hv-skin-1)" />
          <stop offset="0.6" stopColor="var(--hv-skin-2)" />
          <stop offset="1" stopColor="var(--hv-skin-3)" />
        </radialGradient>
        <linearGradient id="hv-hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--hv-hair-1)" />
          <stop offset="1" stopColor="var(--hv-hair-2)" />
        </linearGradient>
        <linearGradient id="hv-tie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
        <linearGradient id="hv-shirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--hv-shirt-1)" />
          <stop offset="1" stopColor="var(--hv-shirt-2)" />
        </linearGradient>
        <linearGradient id="hv-rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--accent-2)" stopOpacity="0.7" />
          <stop offset="0.5" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* shoulders / jacket */}
      <path
        d="M18 380 C18 316 34 286 82 270 L122 256 L150 300 L178 256 L218 270 C266 286 282 316 282 380 Z"
        fill="url(#hv-suit)"
      />
      <path
        d="M18 380 C18 316 34 286 82 270 L122 256 L150 300 L178 256 L218 270 C266 286 282 316 282 380"
        fill="none"
        stroke="url(#hv-rim)"
        strokeWidth="1.6"
      />
      {/* shirt */}
      <path d="M124 252 L150 300 L176 252 L172 380 L128 380 Z" fill="url(#hv-shirt)" />
      {/* tie */}
      <path d="M142 262 L158 262 L161 276 L150 284 L139 276 Z" fill="url(#hv-tie)" />
      <path d="M144 282 L156 282 L164 352 L150 370 L136 352 Z" fill="url(#hv-tie)" />
      {/* lapels */}
      <path d="M122 256 L150 300 L140 380 L104 380 L112 330 L96 310 Z" fill="url(#hv-lapel)" />
      <path d="M178 256 L150 300 L160 380 L196 380 L188 330 L204 310 Z" fill="url(#hv-lapel)" />
      {/* pocket square */}
      <path d="M212 318 L236 314 L232 324 Z" fill="var(--accent-2)" opacity="0.9" />
      {/* neck */}
      <path d="M128 200 L172 200 L176 258 L150 276 L124 258 Z" fill="url(#hv-skin)" />
      <path d="M128 222 C140 236 160 236 172 222 L172 238 C160 248 140 248 128 238 Z" fill="var(--hv-skin-3)" opacity="0.45" />
      {/* collar */}
      <path d="M124 246 L150 276 L136 290 L116 258 Z" fill="var(--hv-shirt-1)" />
      <path d="M176 246 L150 276 L164 290 L184 258 Z" fill="var(--hv-shirt-1)" />
      <g transform="translate(-7.5 6) scale(1.05)">
        {/* ears */}
        <ellipse cx="95" cy="150" rx="9" ry="17" fill="url(#hv-skin)" />
        <ellipse cx="205" cy="150" rx="9" ry="17" fill="url(#hv-skin)" />
        {/* head */}
        <path
          d="M150 62 C196 62 206 98 206 140 C206 186 182 222 150 222 C118 222 94 186 94 140 C94 98 104 62 150 62 Z"
          fill="url(#hv-skin)"
        />
        {/* short, side-parted hair */}
        <path
          d="M93 138 C86 96 106 54 152 51 C196 49 216 84 207 136 C204 122 199 110 191 101 C176 93 160 90 140 89 C142 94 141 98 138 101 C122 100 108 106 100 118 C96 124 94 131 93 138 Z"
          fill="url(#hv-hair)"
        />
        <path d="M140 89 C158 76 182 76 196 90 C182 82 160 82 140 89 Z" fill="var(--hv-hair-hi)" opacity="0.35" />
        {/* soft jaw shading */}
        <path
          d="M104 172 C114 206 132 220 150 222 C168 220 186 206 196 172 C186 196 170 210 150 211 C130 210 114 196 104 172 Z"
          fill="var(--hv-skin-3)"
          opacity="0.35"
        />
      </g>
    </svg>
  );
}

/**
 * Hero composition: a stylised executive figure with the configured focus areas
 * (siteConfig.hero.orbit) orbiting on a tilted ring, in CSS 3D. Decorative (aria-hidden):
 * the same ideas are stated in the hero text.
 * - Orbit chips pass behind the figure via preserve-3d depth.
 * - Animation pauses off-screen and is disabled under prefers-reduced-motion (static fallback).
 * - Pointer tilt only for fine pointers with motion allowed.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const { pick } = useLanguage();
  const items = siteConfig.hero.orbit;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(([entry]) => node.classList.toggle("is-paused", !entry?.isIntersecting));
      io.observe(node);
    }

    const allowTilt =
      window.matchMedia?.("(pointer: fine)").matches &&
      !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!allowTilt) return () => io?.disconnect();

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        node.style.setProperty("--tilt-x", `${(-y * 6).toFixed(2)}deg`);
        node.style.setProperty("--tilt-y", `${(x * 12).toFixed(2)}deg`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      io?.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={ref} className="hero-visual" aria-hidden="true">
      <div className="hv-glow hv-glow--a" />
      <div className="hv-glow hv-glow--b" />
      <div className="hv-halo" />

      <div className="hv-stage">
        <div className="hv-scene">
          <div className="hv-figure-wrap">
            <ExecutiveFigure />
          </div>

          <div className="hv-orbit">
            <div className="hv-orbit__ring" />
            <div className="hv-orbit__ring hv-orbit__ring--inner" />
            <div className="hv-orbit__spin">
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className="hv-orbit__arm"
                  style={{ "--angle": `${(360 / items.length) * i}deg` } as CSSProperties}
                >
                  <div className="hv-chip">
                    <span className="hv-chip__icon">
                      <Icon name={item.icon} size={16} />
                    </span>
                    <span className="hv-chip__label">{pick(item.label)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
