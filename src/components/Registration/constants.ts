import { VALIDATION_MESSAGES, REGEX } from "@/src/common";

export const DEFAULT_VALUES = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

export const INPUT_FIELDS = [
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    autoComplete: "new-email",
    rules: {
      required: VALIDATION_MESSAGES.REQUIRED_EMAIL,
      pattern: {
        value: REGEX.EMAIL,
        message: VALIDATION_MESSAGES.INVALID_EMAIL,
      },
    },
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    autoComplete: "new-password",
    rules: { required: VALIDATION_MESSAGES.REQUIRED_PASSWORD },
  },
  {
    name: "firstName",
    type: "text",
    placeholder: "First Name",
    autoComplete: "name",
    rules: { required: VALIDATION_MESSAGES.REQUIRED_FIRST_NAME },
  },
  {
    name: "lastName",
    type: "text",
    placeholder: "Last Name",
    autoComplete: "name",
    rules: { required: VALIDATION_MESSAGES.REQUIRED_LAST_NAME },
  },
] as const;
