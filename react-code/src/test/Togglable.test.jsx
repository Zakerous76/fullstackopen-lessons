import { rende, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Togglable from "../components/Togglable";

describe("<Togglable/>", () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">togglable content</div>
      </Togglable>
    ).container;
  });

  test("renders its children", async () => {
    await screen.findAllByText("togglable content");
  });

  test("at start the children are not displayed", () => {
    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display:none");
  });

  test("after clicking the button, children are displayed", async () => {
    const mockUser = userEvent.setup();
    const button = screen.getByText("show...");
    await mockUser.click(button);
    const div = container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });

  test("toggled content can be closed", async () => {
    const mockUser = userEvent.setup();
    const button = screen.getByText("show...");
    await mockUser.click(button);

    const closeButton = screen.getByText("Cancel");
    await mockUser.click(closeButton);

    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });
});
