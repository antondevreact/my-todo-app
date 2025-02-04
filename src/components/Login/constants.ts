import { REGEX, VALIDATION_MESSAGES } from "@/src/common";

export const INPUT_FIELDS = [
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    autoComplete: "current-email",
    rules: {
      required: VALIDATION_MESSAGES.REQUIRED_EMAIL,
      pattern: {
        value: REGEX.EMAIL,
        message: "Invalid email address",
      },
    },
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    autoComplete: "current-password",
    rules: {
      required: VALIDATION_MESSAGES.REQUIRED_PASSWORD,
    },
  },
] as const;

export const DEFAULT_VALUES = {
  email: "",
  password: "",
};
