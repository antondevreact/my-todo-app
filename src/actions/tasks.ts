import axios from "axios";
import { TaskStatus } from "@prisma/client";
import { errorManager } from "@/lib/utils/errorManager";
import { API_TASK_URL } from "@/src/common";

interface ICreateTaskRequest {
  title: string
}

interface IUpdateTaskRequest {
  taskId: number;
  status: TaskStatus;
}

interface IDeleteTaskRequest {
  taskId: number;
}

export const getTasks = async () => {
  try {
    const response = await axios.get(API_TASK_URL);

    return response.data;
  } catch (error) {
    errorManager.notify(`Failed to fetch tasks: ${error}`);
    throw error;
  }
};

export const createTask = async (payload: ICreateTaskRequest) => {
  try {
    const { title } = payload;

    const response = await axios.post(API_TASK_URL, { title });

    return response.data;
  } catch (error) {
    errorManager.notify(`Failed to create task: ${error}`);
    throw error;
  }
};

export const updateTaskStatus = async ({
  taskId,
  status,
}: IUpdateTaskRequest) => {
  try {
    const response = await axios.patch(`${API_TASK_URL}/${taskId}`, {
      status,
    });

    return response.data;
  } catch (error) {
    errorManager.notify(`Failed to update task status: ${error}`);
    throw error;
  }
};

export const deleteTask = async (payload: IDeleteTaskRequest) => {
  try {
    const { taskId } = payload;

    const response = await axios.delete(`${API_TASK_URL}/${taskId}`);

    return response.data;
  } catch (error) {
    errorManager.notify(`Failed to delete task: ${error}`);
    throw error;
  }
};
