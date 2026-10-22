import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { useLanguage } from "../i18n/LanguageContext";

export function Approach() {
  const { t } = useLanguage();
  return (
    <section id="approach" className="section approach" aria-labelledby="approach-title">
      <div className="container">
        <SectionHeading
          id="approach-title"
          index="03"
          eyebrow={t.approach.eyebrow}
          title={t.approach.title}
          intro={t.approach.intro}
        />
        <ol className="steps">
          {t.approach.steps.map((step, i) => (
            <Reveal as="li" key={step.title} className="step" delay={i * 70}>
              <span className="step__marker" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__text">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
