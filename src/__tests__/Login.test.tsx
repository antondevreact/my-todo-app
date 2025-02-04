import React from "react";
import { useRouter } from "next/navigation";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Login } from "@/src/components/Login";
import { login } from "@/src/actions/auth";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/src/actions/auth", () => ({
  login: jest.fn(),
}));

describe("Login", () => {
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

  it("renders sign in form correctly", () => {
    renderWithQueryClient(<Login />);
    expect(screen.getByText("Log in to your account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });

  it("submits form with correct data", async () => {
    const mockLoginData = {
      email: "test@example.com",
      password: "password123",
    };

    (login as jest.Mock).mockResolvedValueOnce({ success: true });

    renderWithQueryClient(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: mockLoginData.email },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: mockLoginData.password },
    });

    const form = screen.getByTestId("login-form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith(mockLoginData);
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/tasks");
    });
  });

  it("handles login error correctly", async () => {
    const mockError = new Error("Login failed");
    const mockLoginData = {
      email: "test@example.com",
      password: "password123",
    };

    (login as jest.Mock).mockRejectedValueOnce(mockError);

    const spyError = jest.spyOn(console, "error").mockImplementation();

    renderWithQueryClient(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: mockLoginData.email },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: mockLoginData.password },
    });

    const form = screen.getByTestId("login-form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(spyError).toHaveBeenCalledWith("Login error:", mockError);
    });

    spyError.mockRestore();
  });
});
