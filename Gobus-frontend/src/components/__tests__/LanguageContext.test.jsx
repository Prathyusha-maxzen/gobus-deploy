import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "../context/LanguageContext";

// Dummy component to consume context
const TestComponent = () => {
  const { language, changeLanguage } = useLanguage();
  return (
    <div>
      <span data-testid="lang-name">{language.name}</span>
      <button onClick={() => changeLanguage({ code: "hi", name: "Hindi" })}>
        Change to Hindi
      </button>
    </div>
  );
};

test("provides default language and updates language", () => {
  render(
    <LanguageProvider>
      <TestComponent />
    </LanguageProvider>
  );

  expect(screen.getByTestId("lang-name")).toHaveTextContent("English");

  fireEvent.click(screen.getByText("Change to Hindi"));

  expect(screen.getByTestId("lang-name")).toHaveTextContent("Hindi");
});
