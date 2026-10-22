import type { JSX, SVGProps } from "react";

export type IconName =
  | "web"
  | "delivery"
  | "analytics"
  | "governance"
  | "consult"
  | "mail"
  | "linkedin"
  | "arrowRight"
  | "arrowUpRight"
  | "arrowDown"
  | "arrowUp"
  | "sun"
  | "moon"
  | "system"
  | "menu"
  | "close";

const paths: Record<IconName, JSX.Element> = {
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 8.5h18M9.5 13l-2 2 2 2M14.5 13l2 2-2 2" />
    </>
  ),
  delivery: (
    <>
      <path d="M4 6h9M4 12h13M4 18h6" />
      <circle cx="17" cy="6" r="2" />
      <circle cx="20" cy="12" r="1.2" />
      <circle cx="13" cy="18" r="2" />
    </>
  ),
  analytics: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      <path d="M4 10l6-6 6 9 5-5" opacity=".55" />
    </>
  ),
  governance: (
    <>
      <path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" />
      <path d="M4 12l8 4.5 8-4.5M4 16.5L12 21l8-4.5" />
    </>
  ),
  consult: (
    <>
      <path d="M4 5.5h11a2 2 0 012 2V13a2 2 0 01-2 2H9l-4 3v-3H4a2 2 0 01-2-2V7.5a2 2 0 012-2z" />
      <path d="M19 9h1a2 2 0 012 2v5a2 2 0 01-2 2h-1v2.5L16 18h-4" opacity=".55" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V16M8 7.6v.1M12 16v-3.2c0-1.4 1-2.3 2.2-2.3s2 .9 2 2.3V16M12 10.5V16" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17L17 7M8 7h9v9" />,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" />,
  system: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

/** Decorative stroke icon. Always paired with visible text or an aria-label on the parent. */
export function Icon({ name, size = 20, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
