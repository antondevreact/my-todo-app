import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { INPUT_FIELDS } from "@/src/components/Registration/constants";
import { Registration } from "@/src/components/Registration";
import { register } from "@/src/actions/user";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/src/actions/user", () => ({
  register: jest.fn(),
}));

describe("Registration", () => {
  const mockPush = jest.fn();
  const queryClient = new QueryClient();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  const renderWithQueryClient = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  it("renders sign up form correctly", () => {
    renderWithQueryClient(<Registration />);
    expect(screen.getByText("Create your account")).toBeInTheDocument();

    INPUT_FIELDS.forEach(({ placeholder }) => {
      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });

    expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
  });

  it("submits form with correct data", async () => {
    const mockSignUpData = {
      email: "test@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
    };

    (register as jest.Mock).mockResolvedValueOnce({ success: true });

    renderWithQueryClient(<Registration />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: mockSignUpData.email },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: mockSignUpData.password },
    });
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: mockSignUpData.firstName },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: mockSignUpData.lastName },
    });

    const form = screen.getByTestId("registration-form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith(mockSignUpData);
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/tasks");
    });
  });

  it("handles sign up error correctly", async () => {
    const mockError = new Error("Sign up failed");
    const mockSignUpData = {
      email: "test@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
    };

    (register as jest.Mock).mockRejectedValueOnce(mockError);

    const spyError = jest.spyOn(console, "error").mockImplementation();

    renderWithQueryClient(<Registration />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: mockSignUpData.email },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: mockSignUpData.password },
    });
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: mockSignUpData.firstName },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: mockSignUpData.lastName },
    });

    const form = screen.getByTestId("registration-form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(spyError).toHaveBeenCalledWith("Registration error:", mockError);
    });

    spyError.mockRestore();
  });
});
