import { render, screen } from "@testing-library/react";
import Note from "../components/Note";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

test("renders content", async () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };
  // render(<Note note={note} handleImportanceToggle={() => {}} />);
  // const element = screen.getByText(
  //   "Component testing is done with react-testing-library | true"
  // );
  // expect(element).toBeDefined();

  // const renderResult = render(
  //   <Note note={note} handleImportanceToggle={() => {}} />
  // );
  // const div = renderResult.container.querySelector(".note");
  // screen.debug(div);
  // expect(div).toHaveTextContent(
  //   "Component testing is done with react-testing-library | true"
  // );

  const mockHandler = vi.fn();

  render(<Note note={note} handleImportanceToggle={mockHandler} />);

  const mockUser = userEvent.setup();
  const button = screen.getByText("make 'not important'");
  await mockUser.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
