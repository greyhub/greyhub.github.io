import { siteConfig, type ThemePreference } from "../data/siteConfig";
import { useLanguage } from "../i18n/LanguageContext";
import { useTheme } from "../theme/ThemeContext";
import { Icon, type IconName } from "./Icon";

const icons: Record<ThemePreference, IconName> = { light: "sun", dark: "moon", system: "system" };

/** Cycles through the configured theme options (system → light → dark by default). */
export function ThemeToggle() {
  const { preference, setPreference } = useTheme();
  const { t } = useLanguage();
  const options = siteConfig.site.themeOptions;
  const order: ThemePreference[] = ["system", "light", "dark"].filter((o): o is ThemePreference =>
    (options as readonly string[]).includes(o),
  );
  const next = order[(order.indexOf(preference) + 1) % order.length] ?? "system";
  const label = t.a11y.themeLabel(t.theme[preference], t.theme[next]);

  return (
    <button type="button" className="icon-button" onClick={() => setPreference(next)} aria-label={label} title={label}>
      <Icon name={icons[preference]} size={18} />
    </button>
  );
}
