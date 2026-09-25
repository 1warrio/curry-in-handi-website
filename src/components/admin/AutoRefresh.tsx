"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const REFRESH_INTERVAL = 5000;

export function AutoRefresh() {
  const router = useRouter();

  useEffect(() => {
    const interval = window.setInterval(() => {
      // Don't refresh unnecessarily when the tab isn't visible.
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    }, REFRESH_INTERVAL);

    return () => {
      window.clearInterval(interval);
    };
  }, [router]);

  return null;
}