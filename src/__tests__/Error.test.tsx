import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useErrorContext } from "@/src/app/context/ErrorContext";
import { ErrorModal } from "@/src/components/ErrorModal";
import "@testing-library/jest-dom";

jest.mock("@/src/app/context/ErrorContext");

describe("GlobalErrorModal", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders the error modal when error exists", () => {
    (useErrorContext as jest.Mock).mockReturnValue({
      error: "Test error",
      clearError: jest.fn(),
    });

    render(<ErrorModal />);

    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  it("does not render the modal when there is no error", () => {
    (useErrorContext as jest.Mock).mockReturnValue({
      error: null,
      clearError: jest.fn(),
    });

    render(<ErrorModal />);

    expect(screen.queryByText("Error")).not.toBeInTheDocument();
  });

  it("calls clearError when the close button is clicked", () => {
    const clearErrorMock = jest.fn();
    (useErrorContext as jest.Mock).mockReturnValue({
      error: "Test error",
      clearError: clearErrorMock,
    });

    render(<ErrorModal />);

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(clearErrorMock).toHaveBeenCalledTimes(1);
  });
});
