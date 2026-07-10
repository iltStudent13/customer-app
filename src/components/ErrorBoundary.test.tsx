// ErrorBoundaryRouter.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

function Bomb() {
  throw new Error("Boom!");
}

test("ErrorBoundary around route element shows fallback", () => {
  // suppress React error logging to keep test output clean
  const consoleError = console.error;
  console.error = () => {};

  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary fallback={<div>Something went wrong.</div>}>
              <Bomb />
            </ErrorBoundary>
          }
        />
      </Routes>
    </MemoryRouter>,
  );

  expect(screen.getByText("Something went wrong.")).toBeInTheDocument();

  console.error = consoleError;
});
