import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    const response = await fetch("/api/v1/data/logs", {
      headers: {
        Authorization: `Bearer ${getCookie("session")}`,
      },
    });
    const data = await response.json();

    // Split logs by newline and parse each line as JSON
    const parsedLogs = data.logs
      .split("\n")
      .filter((line) => line.trim()) // Remove empty lines
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch (e) {
          console.error("Failed to parse log line:", e);
          return null;
        }
      })
      .filter((log) => log !== null) // Remove any
      .sort((a, b) => b.time - a.time);

    setLogs(parsedLogs);
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <button
        className="mb-4"
        onClick={() => {
          setLoading(true);
          fetchLogs();
        }}
      >
        Refresh Logs
      </button>
      <Card>
        <CardHeader>
          <CardTitle>Logs</CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <div>No logs available</div>
          ) : (
            <ul>
              {logs.map((log, index) => (
                <li key={index} className="border-b py-2">
                  <div className="flex flex-row gap-x-2 text-xs">
                    <span className="text-xs text-gray-500">
                      {new Date(log.time).toLocaleString()}
                    </span>
                    <strong>{log.msg}</strong>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Logs;
