import { createContext, useContext, useState } from "react";
import i18n from "../../i18n";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem("language");
      return saved ? JSON.parse(saved) : { code: "en", name: "English" };
    } catch (error) {
      return { code: "en", name: "English" };
    }
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    try {
      localStorage.setItem("language", JSON.stringify(lang));
    } catch (e) {}
    if (lang?.code) i18n.changeLanguage(lang.code);
  };

  const t = (key) => {
    return i18n.t(key);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
