import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import List from "./List";

describe("test List", () => {
  test("input event", () => {
    render(<List />);
    const input = screen.getByTestId("input");
    expect(input).toContainHTML("");
    userEvent.type(input, "test123");
    expect(screen.queryByTestId("input")).toContainHTML("test123");
  });
});
