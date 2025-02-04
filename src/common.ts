import { TaskStatus } from "@prisma/client";

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  PAUSED: "Paused",
};

export const userKeys = ["Id", "Email", "First Name", "Last Name"];

export const ROUTE_PATCH = {
  TASKS: "/tasks",
  LOGIN: "/sign-in",
  REGISTRATION: "/sign-up",
};

export const API_TASK_URL = "/api/tasks";
export const API_USER_URL = "/api/user";
export const API_REGISTER_URL = "/api/register";

export const VALIDATION_MESSAGES = {
  REQUIRED_EMAIL: "Email is required",
  INVALID_EMAIL: "Invalid email format",
  REQUIRED_PASSWORD: "Password is required",
  REQUIRED_FIRST_NAME: "First Name is required",
  REQUIRED_LAST_NAME: "Last Name is required",
  REQUIRED_TASK_TITLE: "Task title is required",
};

export const TASK_MESSAGES = {
  ERROR: {
    CREATE_TASK: "Error when creating a task:",
  },
};

export const AUTH_MESSAGES = {
  SUCCESS: {
    USER_REGISTERED: "User registered successfully",
    LOGIN_SUCCESSFUL: "Login successful",
    LOGOUT_SUCCESSFUL: "Logged out successfully",
  },
  ERROR: {
    MISSING_EMAIL_PASSWORD: "Email and password are required",
    USER_ALREADY_EXISTS: "User already exists",
    ERROR_REGISTERING_USER: "Error registering user",
    INVALID_CREDENTIALS: "Invalid credentials",
    ERROR_LOGGING_OUT: "Error during logout",
    REGISTRATION: "Registration error:",
    LOGIN: "Login error:",
    LOGOUT: "Logout error:",
  },
};

export const REGEX = {
  EMAIL: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
};
