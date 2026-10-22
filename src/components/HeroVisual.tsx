import { useEffect, useRef, type CSSProperties } from "react";
import { siteConfig } from "../data/siteConfig";
import { useLanguage } from "../i18n/LanguageContext";
import portrait from "../assets/portrait.webp";
import { Icon } from "./Icon";

/**
 * Hero composition: the portrait (transparent cut-out) with the configured focus areas
 * (siteConfig.hero.orbit) orbiting on a tilted ring, in CSS 3D. The portrait carries alt
 * text; the decorative layers and orbit chips are aria-hidden (the hero text states the same).
 * - Orbit chips pass behind the portrait via preserve-3d depth.
 * - Animation pauses off-screen and is disabled under prefers-reduced-motion (static fallback).
 * - Pointer tilt only for fine pointers with motion allowed.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const { pick } = useLanguage();
  const { person } = siteConfig;
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
    <div ref={ref} className="hero-visual">
      <div className="hv-glow hv-glow--a" aria-hidden="true" />
      <div className="hv-glow hv-glow--b" aria-hidden="true" />
      <div className="hv-halo" aria-hidden="true" />

      <div className="hv-stage">
        <div className="hv-scene">
          <div className="hv-figure-wrap">
            <img
              className="hv-portrait"
              src={portrait}
              alt={pick(person.portraitAlt)}
              width={362}
              height={528}
              decoding="async"
              fetchPriority="high"
            />
          </div>

          <div className="hv-orbit" aria-hidden="true">
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
