"use client";

import React, { FC } from "react";
import clsx from "clsx";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskStatus } from "@prisma/client";
import { deleteTask, getTasks, updateTaskStatus } from "@/src/actions/tasks";
import { ITask } from "@/src/lib/types/task";
import { TASK_STATUS_LABELS } from "@/src/common";

export const TaskList: FC = () => {
  const { invalidateQueries } = useQueryClient();

  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: number; status: TaskStatus }) =>
      updateTaskStatus({ taskId, status }),
    onSuccess: () => {
      refetch();
      invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: number) => deleteTask({ taskId }),
    onSuccess: () => {
      refetch();
      invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  if (isLoading) return <p>Loading tasks...</p>;
  if (!tasks?.length) return <h4>No tasks</h4>;

  return (
    <div className="flex-wrapper w-full flex-col">
      <ul className="space-y-4 shadow-lg p-4 rounded-lg w-1/2 max-h-[600px] overflow-y-scroll">
        {tasks.map(({ id, title, status }: ITask) => (
          <li
            key={id}
            className="flex items-center justify-between border-b pb-2 gap-8 w-100"
          >
            <span
              className={clsx(
                "px-2 w-full rounded break-words truncate max-w-84 overflow-hidden",
                {
                  "line-through text-gray-500": status === TaskStatus.COMPLETED,
                  "bg-green-300 text-black": status === TaskStatus.IN_PROGRESS,
                  "bg-gray-300 text-black": status === TaskStatus.PAUSED,
                  "text-black": status === TaskStatus.PENDING,
                }
              )}
            >
              {title}
            </span>
            <div className="space-x-2 flex-wrapper">
              <select
                value={status}
                onChange={(e) =>
                  updateTaskMutation.mutate({
                    taskId: id,
                    status: e.target.value as TaskStatus,
                  })
                }
                className="bg-white border border-gray-300 text-gray-700 px-2 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-8 italic"
              >
                {Object.entries(TASK_STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => deleteTaskMutation.mutate(id)}
                className="px-3 py-1 text-sm rounded text-white bg-red-500 hover:bg-red-600 h-8"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
