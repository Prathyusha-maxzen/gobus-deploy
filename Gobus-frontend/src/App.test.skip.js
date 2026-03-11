import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders loading screen", () => {
  render(<App />);
  const loadingText = screen.getByText(/loading buses/i);
  expect(loadingText).toBeInTheDocument();
});
