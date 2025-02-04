import React, { FC } from "react";
import { useErrorContext } from "@/src/app/context/ErrorContext";

export const ErrorModal: FC = () => {
  const { error, clearError } = useErrorContext();

  const handleClose = () => {
    clearError();
  };

  return (
    <>
      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-2 w-4/12 max-w-md flex flex-col gap-0 items-center">
            <h4 className="bg-white p-2 text-center text-red-600">Error</h4>
            <p className="text-gray-700 mt-1 text-center">{error}</p>
            <div className="flex justify-end mt-6">
              <button onClick={handleClose} className="btn btn-danger">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
