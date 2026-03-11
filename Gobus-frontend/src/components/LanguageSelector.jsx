// c:\Users\lokes\Downloads\mah\src\components\LanguageSelector.jsx
import { useLanguage } from "./context/LanguageContext";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "kn", name: "Kannada" },
  { code: "ml", name: "Malayalam" },
  { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" },
  { code: "bn", name: "Bengali" },
];

export default function LanguageSelector({ isOpen, onClose, onSelect, selected }) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4" onClick={onClose}>
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-[400px] relative max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 font-bold text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">{t("selectLanguage")}</h2>

        <div className="grid grid-cols-2 gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onSelect(lang);
                onClose();
              }}
              className={`p-2 rounded-md border text-left hover:bg-red-50 hover:border-red-200 transition ${
                selected?.code === lang.code
                  ? "bg-red-50 border-red-500 text-red-700"
                  : "border-gray-200"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
