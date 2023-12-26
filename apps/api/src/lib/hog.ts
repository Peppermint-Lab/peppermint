import { PostHog } from "posthog-node";

export function track() {
  return new PostHog(
    "phc_2gbpy3JPtDC6hHrQy35yMxMci1NY0fD1sttGTcPjwVf",

    { host: "https://app.posthog.com" }
  );
}
