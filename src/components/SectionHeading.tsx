import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  align?: "start" | "center";
}

export function SectionHeading({ id, index, eyebrow, title, intro, align = "start" }: SectionHeadingProps) {
  return (
    <Reveal className={`section-heading section-heading--${align}`}>
      <p className="eyebrow">
        <span className="eyebrow__index">{index}</span>
        <span className="eyebrow__rule" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </Reveal>
  );
}
