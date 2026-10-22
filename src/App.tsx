import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { useLanguage } from "./i18n/LanguageContext";
import { About } from "./sections/About";
import { Approach } from "./sections/Approach";
import { Contact } from "./sections/Contact";
import { Hero } from "./sections/Hero";
import { Partners } from "./sections/Partners";
import { Projects } from "./sections/Projects";
import { Services } from "./sections/Services";

export default function App() {
  const { t } = useLanguage();
  return (
    <>
      <a href="#main" className="skip-link">
        {t.a11y.skipToContent}
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Services />
        <Approach />
        <Projects />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
