import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/server/services/authService";
import { AUTH_MESSAGES } from "@/src/common";

export class AuthController {
  static async register(req: NextRequest) {
    try {
      const body = await req.json();
      const { email, password, firstName, lastName } = body;

      if (!email || !password) {
        console.error(AUTH_MESSAGES.ERROR.MISSING_EMAIL_PASSWORD);

        return NextResponse.json(
          { message: AUTH_MESSAGES.ERROR.MISSING_EMAIL_PASSWORD },
          { status: 400 }
        );
      }

      const newUser = await AuthService.register(
        email,
        password,
        firstName,
        lastName
      );

      return NextResponse.json(
        {
          message: AUTH_MESSAGES.SUCCESS.USER_REGISTERED,
          user: { id: newUser.id, email: newUser.email },
        },
        { status: 201 }
      );
    } catch (error: unknown) {
      console.error("Error in register method:", error);

      if ((error as Error).message === "User already exists") {
        return NextResponse.json(
          { message: AUTH_MESSAGES.ERROR.USER_ALREADY_EXISTS },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { message: AUTH_MESSAGES.ERROR.ERROR_REGISTERING_USER },
        { status: 500 }
      );
    }
  }

  static async login(req: NextRequest) {
    const { email, password } = await req.json();

    try {
      const user = await AuthService.login(email, password);
      return NextResponse.json(
        {
          message: AUTH_MESSAGES.SUCCESS.LOGIN_SUCCESSFUL,
          user: { id: user.id, email: user.email },
        },
        { status: 200 }
      );
    } catch (error) {
      console.error(AUTH_MESSAGES.ERROR.INVALID_CREDENTIALS, error);

      return NextResponse.json(
        { message: `${AUTH_MESSAGES.ERROR.INVALID_CREDENTIALS} ${error}` },
        { status: 400 }
      );
    }
  }

  static async logout() {
    try {
      await AuthService.logout();

      return NextResponse.json(
        { message: AUTH_MESSAGES.SUCCESS.LOGOUT_SUCCESSFUL },
        { status: 200 }
      );
    } catch (error) {
      console.error(AUTH_MESSAGES.ERROR.ERROR_LOGGING_OUT, error);

      return NextResponse.json(
        { message: AUTH_MESSAGES.ERROR.ERROR_LOGGING_OUT },
        { status: 500 }
      );
    }
  }
}
