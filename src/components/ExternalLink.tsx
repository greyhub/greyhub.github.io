import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useLanguage } from "../i18n/LanguageContext";

interface ExternalLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
  href: string;
  children: ReactNode;
}

/** Link that opens in a new tab with safe rel attributes and a screen-reader hint. */
export function ExternalLink({ children, ...rest }: ExternalLinkProps) {
  const { t } = useLanguage();
  return (
    <a {...rest} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="visually-hidden"> {t.a11y.opensInNewTab}</span>
    </a>
  );
}
