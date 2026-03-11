import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translations } from "./components/context/translations";

const resources = Object.keys(translations).reduce((acc, key) => {
  acc[key] = { translation: translations[key] };
  return acc;
}, {});

const savedLang = (() => {
  try {
    const s = localStorage.getItem("language");
    return s ? JSON.parse(s).code : "en";
  } catch (e) {
    return "en";
  }
})();

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
