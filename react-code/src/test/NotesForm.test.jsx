import { render, screen } from "@testing-library/react";
import NotesForm from "../components/NotesForm";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

test("<NotesForm/> updates parent state and calls onSubmit", async () => {
  const toggleVisibility = () => {
    console.log("toggleVisibility called");
  };
  const createNote = vi.fn();
  const noteFormRef = {
    current: {
      toggleVisibility: toggleVisibility,
    },
  };
  const mockUser = userEvent.setup();

  render(<NotesForm createNote={createNote} noteFormRef={noteFormRef} />);

  const input = screen.getByPlaceholderText("write note content here...");
  const sendButton = screen.getByText("save");

  await mockUser.type(input, "testing a form...");
  await mockUser.click(sendButton);

  expect(createNote.mock.calls).toHaveLength(1);
  console.log(createNote.mock.calls);
  expect(createNote.mock.calls[0][0].content).toBe("testing a form...");
});
