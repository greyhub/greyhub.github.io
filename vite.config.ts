import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { siteConfig } from "./src/data/siteConfig";
import { translations } from "./src/i18n/translations";

/**
 * Fills `%SITE_*%` placeholders in index.html from siteConfig/translations so that
 * static metadata (read by crawlers and link previews before JS runs) is never
 * duplicated by hand.
 */
function siteMetadata(): Plugin {
  const lang = siteConfig.site.defaultLanguage;
  const meta = translations[lang].meta;
  const alternate = siteConfig.site.supportedLanguages.find((l) => l !== lang) ?? lang;
  const values: Record<string, string> = {
    SITE_LANG: lang,
    SITE_TITLE: meta.title,
    SITE_DESCRIPTION: meta.description,
    SITE_OG_LOCALE: meta.ogLocale,
    SITE_OG_LOCALE_ALT: translations[alternate].meta.ogLocale,
    SITE_URL: siteConfig.site.productionUrl,
    SITE_NAME: siteConfig.person.displayName,
    SITE_THEME_KEY: siteConfig.site.storageKeys.theme,
    SITE_LANG_KEY: siteConfig.site.storageKeys.language,
    SITE_LANGS: siteConfig.site.supportedLanguages.join(","),
    SITE_ROLE: siteConfig.person.title,
    SITE_EMAIL: siteConfig.contact.email,
    SITE_LINKEDIN: siteConfig.contact.linkedin,
  };
  const escape = (v: string) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  return {
    name: "site-metadata",
    transformIndexHtml(html) {
      return html.replace(/%(SITE_[A-Z_]+)%/g, (match, key: string) =>
        key in values ? escape(values[key] as string) : match,
      );
    },
  };
}

// greyhub.github.io is a GitHub Pages *user* site, served from the domain root,
// so `base` stays "/" (never "/greyhub.github.io/"). Mirrors siteConfig.deployment.basePath.
export default defineConfig({
  base: siteConfig.deployment.basePath,
  plugins: [react(), siteMetadata()],
  build: {
    outDir: "dist",
    target: "es2020",
  },
});
