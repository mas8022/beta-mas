"use client";
import Fetch from "@/utils/fetchers/Fetch";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AuthGuard = ({ children }) => {
  const pathname = usePathname();
  const [isAccess, setIsAccess] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const checkAccess = async () => {
      try {
        const { status } = await Fetch.get("/api/auth/refresh");

        if (!isMounted) return;

        if (status > 201) {
          setIsAccess("no-access");
        } else {
          setIsAccess("access");
        }
      } catch (error) {
        if (isMounted) setIsAccess("no-access");
      }
    };

    checkAccess();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isAccess === null) {
    return null;
  }

  if (isAccess === "no-access") {
    if (pathname !== "/auth") {
      location.pathname = "/auth";
      return null;
    }

    return children;
  }

  if (pathname === "/auth") {
    location.pathname = "/";
    return null;
  }

  return children;
};

export default AuthGuard;
