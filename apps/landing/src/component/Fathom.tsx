// Fathom.tsx
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";


import { load, trackPageview } from "fathom-client";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function TrackPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Load the Fathom script on mount
  useEffect(() => {
    load(process.env.NEXT_PUBLIC_FATHOM_ID, {
      auto: false,
    });
  }, []);

  // Record a pageview when route changes
  useEffect(() => {
    if (!pathname) return;

    trackPageview({
      url: pathname + searchParams?.toString(),
      referrer: document.referrer,
    });
  }, [pathname, searchParams]);

  return null;
}

export default function Fathom() {
  return (
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  );
}
