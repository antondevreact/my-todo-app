"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/src/actions/user";
import { INPUT_FIELDS, DEFAULT_VALUES } from "./constants";
import { AUTH_MESSAGES, ROUTE_PATCH } from "@/src/common";

interface IFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const Registration: FC = () => {
  const router = useRouter();

  const { control, handleSubmit } = useForm<IFormData>({
    defaultValues: DEFAULT_VALUES,
  });

  const registerMutation = useMutation({
    mutationFn: async (data: IFormData) => await register(data),
    onSuccess: () => router.push(ROUTE_PATCH.TASKS),
    onError: (error) => console.error(AUTH_MESSAGES.ERROR.REGISTRATION, error),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => registerMutation.mutate(data))}
      className="form flex-wrapper max-w-96"
      data-testid="registration-form"
    >
      <h4>Create your account</h4>
      {INPUT_FIELDS.map(({ name, type, placeholder, autoComplete, rules }) => (
        <Controller
          key={name}
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              required
            />
          )}
        />
      ))}
      <button type="submit" className="btn btn-primary w-1/3">
        Sign Up
      </button>
    </form>
  );
};
