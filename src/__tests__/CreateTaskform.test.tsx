import React, { JSX } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CreateTaskForm } from "@/src/components/CreateTaskForm";
import { createTask } from "@/src/actions/tasks";

jest.mock("@/src/actions/tasks", () => ({
  createTask: jest.fn(),
}));

const renderWithQueryClient = (ui: JSX.Element) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

it("submits form with correct task data", async () => {
  const mockTaskData = {
    title: "New Task",
  };

  (createTask as jest.Mock).mockResolvedValueOnce({ success: true });

  renderWithQueryClient(<CreateTaskForm />);

  fireEvent.change(screen.getByPlaceholderText("Enter task title"), {
    target: { value: mockTaskData.title },
  });

  const submitButton = screen.getByRole("button", { name: /add task/i });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(createTask).toHaveBeenCalledWith({ title: mockTaskData.title });
  });
  expect(
    (screen.getByPlaceholderText("Enter task title") as HTMLInputElement).value
  ).toBe("");
});
