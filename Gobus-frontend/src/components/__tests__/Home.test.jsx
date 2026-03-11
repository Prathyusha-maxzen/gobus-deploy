import { render, screen } from "@testing-library/react";
import Home from "../Home";

// Mock child components
jest.mock("../Navbar", () => () => <div>Navbar</div>);
jest.mock("../SearchForm", () => () => <div>SearchForm</div>);
jest.mock("../Features", () => () => <div>Features</div>);
jest.mock("../PopularRoutes", () => () => <div>PopularRoutes</div>);

// Mock image
jest.mock("../../assets/travel-bg.webp", () => "travel-bg-mock");

describe("Home Page", () => {
  test("renders hero section text", () => {
    render(<Home />);

    expect(
      screen.getByText("Book Your Bus Tickets Easily")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Fast, Safe and Reliable Bus Booking")
    ).toBeInTheDocument();
  });
});
