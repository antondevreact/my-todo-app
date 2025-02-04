import React, { FC } from "react";
import { CreateTaskForm } from "../CreateTaskForm";
import { TaskList } from "../TaskList";

export const TaskBoard: FC = () => (
  <>
    <CreateTaskForm />
    <TaskList />
  </>
);
