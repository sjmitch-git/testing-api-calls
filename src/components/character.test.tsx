import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import { Character } from "./character";

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

test("renders loading state and then the character name", async () => {
  render(<Character />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByTestId("title")).toHaveTextContent("Luke Skywalker");
  });
});

test("renders loading state and then an error message with a 500 status response", async () => {
  server.use(
    rest.get("https://swapi.dev/api/people/1", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<Character />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("HTTP error! Status: 500")).toBeInTheDocument();
  });
});
