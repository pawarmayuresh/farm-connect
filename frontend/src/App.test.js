import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./api", () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

test("renders the FarmConnect dashboard", async () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: /farmconnect/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /add product/i })).toBeInTheDocument();
  expect(await screen.findByText(/no products yet/i)).toBeInTheDocument();
});
