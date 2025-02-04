"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/auth";
import { useMutation } from "@tanstack/react-query";
import { AUTH_MESSAGES, ROUTE_PATCH } from "@/src/common";
import { RedirectButton } from "./RedirectButton";

export const Navigation = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => router.push(ROUTE_PATCH.LOGIN),
    onError: (error) => console.error(AUTH_MESSAGES.ERROR.LOGOUT, error),
  });

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-end fixed w-screen">
      <ul className="flex space-x-4">
        <li>
          {session ? (
            <p
              onClick={() => logoutMutation.mutate()}
              className="text-lg hover:underline cursor-pointer"
            >
              Logout
            </p>
          ) : (
            <Link href="/sign-in" className="text-lg hover:underline">
              Sign in
            </Link>
          )}
        </li>
        <li className="flex items-center mx-2">/</li>
        <li>
          <RedirectButton
            label={session ? "Tasks" : "Sign up"}
            path={session ? ROUTE_PATCH.TASKS : ROUTE_PATCH.REGISTRATION}
          />
        </li>
      </ul>
    </nav>
  );
};
