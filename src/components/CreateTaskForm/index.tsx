"use client";

import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTask, getTasks } from "@/src/actions/tasks";
import { TASK_MESSAGES, VALIDATION_MESSAGES } from "@/src/common";
import { DEFAULT_VALUES } from "./constants";

interface IFormData {
  title: string;
}

export const CreateTaskForm: FC = () => {
  const { control, handleSubmit, reset } = useForm<IFormData>({
    defaultValues: DEFAULT_VALUES,
  });

  const { refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const createTaskMutation = useMutation({
    mutationFn: async (data: IFormData) => createTask(data),
    onSuccess: () => {
      reset();
      refetch();
    },
    onError: (error) => console.error(TASK_MESSAGES.ERROR.CREATE_TASK, error),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => createTaskMutation.mutate(data))}
      className="flex-wrapper flex-row rounded-md w-1/2 shadow-lg border min-w-96 p-2"
      id="new-task-form"
    >
      <Controller
        name="title"
        control={control}
        rules={{ required: VALIDATION_MESSAGES.REQUIRED_TASK_TITLE }}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            placeholder="Enter task title"
            className="w-full h-8"
          />
        )}
      />

      <button
        type="submit"
        className="btn-primary px-2 py rounded min-w-24 h-8"
      >
        Add Task
      </button>
    </form>
  );
};
