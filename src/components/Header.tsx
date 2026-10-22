import { useEffect, useRef, useState } from "react";
import { siteConfig } from "../data/siteConfig";
import { useLanguage } from "../i18n/LanguageContext";
import { navSections } from "../i18n/translations";
import { Icon } from "./Icon";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { useActiveSection } from "./useActiveSection";

const spySections = ["home", "about", "services", "approach", "partners", "contact"] as const;

export function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(spySections);
  const toggleRef = useRef<HTMLButtonElement>(null);
  // The approach section belongs to "Expertise" in the navigation.
  const activeNav = active === "approach" ? "services" : active;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth > 1080 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.body.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled || open ? "is-elevated" : ""} ${open ? "is-open" : ""}`}>
      <div className="site-header__inner container">
        <a href="#home" className="brand">
          <span className="brand__mark">{siteConfig.person.monogram}</span>
          <span className="brand__name">{siteConfig.person.shortName}</span>
          <span className="visually-hidden">
            {" "}
            — {siteConfig.person.displayName}, {t.a11y.homeLink}
          </span>
        </a>

        <nav id="primary-nav" className="primary-nav" aria-label={t.a11y.primaryNav}>
          <ul className="primary-nav__list">
            {navSections.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="primary-nav__link"
                  aria-current={activeNav === id ? "location" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__controls">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className="icon-button menu-toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "close" : "menu"} size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
