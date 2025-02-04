"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SESSION_STATUS } from "@/lib/types/session";
import { ROUTE_PATCH } from "@/src/common";

const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === SESSION_STATUS.AUTHENTICATED) {
      router.replace(ROUTE_PATCH.TASKS);
      return;
    }

    if (status === SESSION_STATUS.UNAUTHENTICATED) {
      router.replace(ROUTE_PATCH.LOGIN);
      return;
    }
  }, [session, status, router]);

  return (
    <div className="flex-wrapper">
      <p>Loading...</p>
    </div>
  );
};

export default HomePage;
