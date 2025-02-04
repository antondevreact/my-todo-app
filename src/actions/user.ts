import axios from "axios";
import { signIn } from "next-auth/react";
import { errorManager } from "@/lib/utils/errorManager";
import { API_REGISTER_URL, API_USER_URL } from "@/src/common";

interface IUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const getUser = async () => {
  try {
    const response = await axios.get(API_USER_URL);

    return response.data;
  } catch (error) {
    errorManager.notify(`Error fetching user data: ${error}`);
  }
};

export const register = async (payload: IUserRequest) => {
  try {
    const { email, firstName, lastName, password } = payload;

    const response = await axios.post(
      API_REGISTER_URL,
      {
        email,
        password,
        firstName,
        lastName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      if (result?.error) {
        errorManager.notify(`Login failed: ${result.error}`);
      }
    }
  } catch (error) {
    errorManager.notify(`Registration failed: ${error}`);
  }
};
