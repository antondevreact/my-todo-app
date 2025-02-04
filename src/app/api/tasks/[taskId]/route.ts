import { NextRequest } from "next/server";
import { TaskController } from "@/src/server/controllers/taskController";

export async function PATCH(req: NextRequest) {
  return TaskController.updateTask(req);
}

export async function DELETE(req: NextRequest) {
  return TaskController.deleteTask(req);
}
