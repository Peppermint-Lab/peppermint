import { toast } from "@/shadcn/hooks/use-toast";
import { Button } from "@/shadcn/ui/button";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

interface Session {
  id: string;
  userAgent: string;
  ipAddress: string;
  createdAt: string;
  expires: string;
}

function getPrettyUserAgent(userAgent: string) {
  // Extract browser and OS
  const browser =
    userAgent
      .match(/(Chrome|Safari|Firefox|Edge)\/[\d.]+/)?.[0]
      .split("/")[0] ?? "Unknown Browser";
  const os = userAgent.match(/\((.*?)\)/)?.[1].split(";")[0] ?? "Unknown OS";

  return `${browser} on ${os}`;
}

export default function Sessions() {
  const [sessions, setSessions] = useState<Session[]>([]);

  const fetchSessions = async () => {
    try {
      const response = await fetch("/api/v1/auth/sessions", {
        headers: {
          Authorization: `Bearer ${getCookie("session")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch sessions");
      }
      const data = await response.json();
      setSessions(data.sessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);

      toast({
        variant: "destructive",
        title: "Error fetching sessions",
        description: "Please try again later",
      });
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const revokeSession = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/v1/auth/sessions/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${getCookie("session")}`,
        },
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to revoke session");
      }

      toast({
        title: "Session revoked",
        description: "The session has been revoked",
      });

      fetchSessions();
    } catch (error) {
      console.error("Error revoking session:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col space-y-1 mb-4">
        <h1 className="text-2xl font-bold">Active Sessions</h1>
        <span className="text-sm text-foreground">
          Devices you are logged in to
        </span>
      </div>
      <div className="space-y-4">
        {sessions &&
          sessions.map((session) => (
            <div
              key={session.id}
              className="flex flex-row items-center justify-between p-4 border rounded-lg group"
            >
              <div>
                <div className="text-base font-bold">
                  {session.ipAddress === "::1"
                    ? "Localhost"
                    : session.ipAddress}
                </div>
                <div className="font-bold text-xs">
                  {getPrettyUserAgent(session.userAgent)}
                </div>
                <div className="text-xs text-foreground">
                  Created: {new Date(session.createdAt).toLocaleString("en-GB")}
                </div>
                <div className="text-xs text-foreground">
                  Expires: {new Date(session.expires).toLocaleString("en-GB")}
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  onClick={() => revokeSession(session.id)}
                  variant="destructive"
                >
                  Revoke
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
