import React from "react";
import { TaskBoard } from "@/src/components/TaskBoard";

const TasksPage = () => {
  return (
    <div className="flex-wrapper flex-col mt-16">
      <h2>Task Management</h2>
      <TaskBoard />
    </div>
  );
};

export default TasksPage;
