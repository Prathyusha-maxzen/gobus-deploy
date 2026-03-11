import { render, screen } from "@testing-library/react";
import Features from "../Features";

// Mock the image since it's required in the component
jest.mock('../../assets/617.jpg', () => 'mock-image.jpg');

test("renders Features component", () => {
  render(<Features />);
  expect(screen.getByText("Safe Travel")).toBeInTheDocument();
  expect(screen.getByText("Live Tracking")).toBeInTheDocument();
  expect(screen.getByText("Easy Booking")).toBeInTheDocument();
});
