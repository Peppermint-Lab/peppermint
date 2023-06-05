import { useState, useEffect } from "react";

export default function EmailQueues() {
  const [queues, setQueues] = useState();

  // fetch queues / display them
  // create a new queue

  async function fetchQueues() {
    const res = await fetch("/api/v1/admin/email-queue/check").then((res) =>
      res.json()
    );
    setQueues(res.queues);
  }

  async function deleteItem(id) {
    await fetch("/api/v1/admin/email-queue/delete", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then((res) => res.json())
      .then(() => fetchQueues());
  }

  useEffect(() => {
    fetchQueues();
  });

  return (
    <div>
      <main className="flex-1">
        <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
          <div className="pt-10 pb-16 divide-y-2">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-3xl font-extrabold text-gray-900">
                New Email Queue
              </h1>
            </div>
            <div className="px-4 sm:px-6 md:px-0"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
