import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import enLang from "./locales/en/translation.json";
import frLang from "./locales/fr/translation.json";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLang: "en",
    resources: {
      en: {
        translation: enLang,
      },
      fr: {
        translation: frLang,
      },
    },
  });

// i18n.changeLanguage("en");

export default i18n;
