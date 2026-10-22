import { useEffect, useRef } from "react";

/**
 * Abstract, CSS-3D hero composition: a glass core, orbital rings, floating glass panels
 * and a faint data network. Purely decorative (aria-hidden), no external assets.
 * - Animations pause when off-screen and are disabled under prefers-reduced-motion (CSS).
 * - Pointer tilt only runs for fine pointers with motion allowed.
 * The static render (no animation, no tilt) is the fallback.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);

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
        node.style.setProperty("--tilt-x", `${(-y * 8).toFixed(2)}deg`);
        node.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
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

      <svg className="hv-network" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        <g className="hv-network__lines">
          <path d="M40 300 L120 230 L205 250 L290 160 L360 190" />
          <path d="M70 110 L150 150 L205 250" />
          <path d="M150 150 L250 80 L290 160" />
          <path d="M120 230 L95 335 L210 360 L300 300 L360 190" />
          <path d="M210 360 L205 250 L300 300" />
        </g>
        <path className="hv-network__pulse" d="M40 300 L120 230 L205 250 L290 160 L360 190" />
        <g className="hv-network__nodes">
          {[
            [40, 300],
            [120, 230],
            [205, 250],
            [290, 160],
            [360, 190],
            [70, 110],
            [150, 150],
            [250, 80],
            [95, 335],
            [210, 360],
            [300, 300],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.6" />
          ))}
        </g>
      </svg>

      <div className="hv-stage">
        <div className="hv-scene">
          <div className="hv-orbit hv-orbit--1">
            <div className="hv-ring">
              <span className="hv-ring__node" />
            </div>
          </div>
          <div className="hv-orbit hv-orbit--2">
            <div className="hv-ring">
              <span className="hv-ring__node" />
            </div>
          </div>
          <div className="hv-orbit hv-orbit--3">
            <div className="hv-ring">
              <span className="hv-ring__node" />
            </div>
          </div>

          <div className="hv-core">
            <div className="hv-core__shine" />
          </div>

          <div className="hv-panel hv-panel--rows">
            <span className="hv-dot" />
            <span className="hv-line hv-line--w80" />
            <span className="hv-line hv-line--w60" />
            <span className="hv-line hv-line--w70" />
          </div>
          <div className="hv-panel hv-panel--bars">
            {[38, 62, 48, 80, 66].map((h, i) => (
              <span key={i} className="hv-bar" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="hv-panel hv-panel--tree">
            <span className="hv-node" />
            <span className="hv-branch" />
            <span className="hv-node hv-node--sm" />
            <span className="hv-node hv-node--sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
