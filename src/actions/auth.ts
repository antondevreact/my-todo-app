import { signIn, signOut } from "next-auth/react";
import { errorManager } from "@/lib/utils/errorManager";

interface ICredentials {
  email: string;
  password: string;
}

export const login = async (credentials: ICredentials) => {
  try {
    const result = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    if (result?.error) {
      errorManager.notify(`Login failed: ${result.error}`);
      return null;
    }

    return result;
  } catch (error) {
    errorManager.notify("An unexpected error occurred during login");
    console.error("Login error:", error);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut({ redirect: false });
    console.log("Successfully logged out");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
