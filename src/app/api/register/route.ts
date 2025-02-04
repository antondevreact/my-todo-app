import { NextRequest } from "next/server";
import { AuthController } from "@/src/server/controllers/authController";

export async function POST(req: NextRequest) {
  return AuthController.register(req);
}
