"use client";

import { useEffect, useRef } from "react";

/**
 * When a booking changes from active to cancelled while the guest is on the
 * page, scroll back to the top and focus the status heading so they see (and a
 * screen reader announces) that the cancellation went through. Does nothing
 * when the page simply loads already cancelled.
 */
export function ScrollToStatusOnCancel({
  cancelled,
  headingId,
}: {
  cancelled: boolean;
  headingId: string;
}) {
  const wasCancelled = useRef(cancelled);

  useEffect(() => {
    if (cancelled && !wasCancelled.current) {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      document.getElementById(headingId)?.focus({ preventScroll: true });
    }
    wasCancelled.current = cancelled;
  }, [cancelled, headingId]);

  return null;
}
