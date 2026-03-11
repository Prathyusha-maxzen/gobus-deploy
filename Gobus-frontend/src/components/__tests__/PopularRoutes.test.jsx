import { render, screen } from "@testing-library/react";
import PopularRoutes from "../PopularRoutes";

describe("PopularRoutes Component", () => {

  test("renders PopularRoutes component", () => {
    render(<PopularRoutes />);
    const heading = screen.getByText("Popular Routes");
    expect(heading).toBeInTheDocument();
  });

  test("renders all route cards", () => {
    render(<PopularRoutes />);
    
    const routes = [
      "Hyderabad → Bangalore",
      "Chennai → Vizag",
      "Delhi → Jaipur",
      "Mumbai → Pune",
    ];

    routes.forEach(route => {
      expect(screen.getByText(route)).toBeInTheDocument();
    });
  });

  test("renders exactly 4 routes", () => {
    render(<PopularRoutes />);
    const routeElements = screen.getAllByText(/→/);
    expect(routeElements.length).toBe(4);
  });

});
