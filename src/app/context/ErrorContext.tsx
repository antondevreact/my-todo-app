"use client";

import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { errorManager } from "@/src/lib/utils/errorManager";

type ErrorContextType = {
  error: string | null;
  setGlobalError: (error: string) => void;
  clearError: () => void;
};

const ErrorContext = createContext<ErrorContextType | null>(null);

export const ErrorProvider: FC<PropsWithChildren> = ({ children }) => {
  const [error, setErrorState] = useState<string | null>(null);

  const setGlobalError = (error: string) => setErrorState(error);
  const clearError = () => setErrorState(null);

  const errorHandler = useCallback((message: string) => {
    setErrorState(message);
  }, []);

  useEffect(() => {
    errorManager.setHandler(errorHandler);

    return () => {
      errorManager.setHandler(() => null);
    };
  }, [errorHandler]);

  return (
    <ErrorContext.Provider value={{ error, setGlobalError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = (): ErrorContextType => {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error("useErrorContext must be used within an ErrorProvider");
  }

  return context;
};
