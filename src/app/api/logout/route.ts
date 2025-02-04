import { AuthController } from "@/src/server/controllers/authController";

export async function POST() {
  return AuthController.logout();
}
