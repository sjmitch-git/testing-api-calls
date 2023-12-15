import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Character } from "./character";
import { getRoles } from "@testing-library/dom";

const server = setupServer(
  rest.get("https://swapi.dev/api/people/1", (req, res, ctx) => {
    return res(
      ctx.json({
        name: "Luke Skywalker",
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/* describe("Character component", () => {
  it("renders loading state and then the character name", async () => {
    render(<Character />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await screen.findByRole("heading", { level: 1 });

    expect(screen.getByRole("heading")).toHaveTextContent("Luke Skywalker");
  });
}); */

test("renders loading state and then the character name", async () => {
  render(<Character />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByTestId("title")).toHaveTextContent("Luke Skywalker");
  });
});
