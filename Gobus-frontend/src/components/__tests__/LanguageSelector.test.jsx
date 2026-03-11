import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSelector from "../LanguageSelector";

const mockOnSelect = jest.fn();
const mockOnClose = jest.fn();

test("renders language selector when open", () => {
  render(
    <LanguageSelector
      isOpen={true}
      onClose={mockOnClose}
      onSelect={mockOnSelect}
      selected={{ code: "en", name: "English" }}
    />
  );
  expect(screen.getByText("Select Language")).toBeInTheDocument();
  expect(screen.getByText("English")).toBeInTheDocument();
  expect(screen.getByText("Hindi")).toBeInTheDocument();
});

test("does not render when closed", () => {
  render(
    <LanguageSelector
      isOpen={false}
      onClose={mockOnClose}
      onSelect={mockOnSelect}
      selected={{ code: "en", name: "English" }}
    />
  );
  expect(screen.queryByText("Select Language")).not.toBeInTheDocument();
});
