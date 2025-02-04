"use client";

import React from "react";

interface IProps {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: IProps) => {
  return (
    <main className="bg-gray-900 grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-xl font-semibold text-red-700 dark:text-red-500">
          There was a problem
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
          {error.message || "Something went wrong"}
        </h1>
        <p className="mt-6 text-xl leading-7 text-zinc-100">
          Please try again.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button onClick={() => reset()} className="btn btn-primary">
            Try again
          </button>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
