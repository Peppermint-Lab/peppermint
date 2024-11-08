import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();

  async function check() {
    if (router.query.code) {
      await fetch(
        `/api/v1/email-queue/oauth/gmail?code=${router.query.code}&mailboxId=${router.query.state}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("session")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            router.push("/admin/email-queues");
          }
        });
    }
  }

  useEffect(() => {
    check();
  }, [router]);

  return <div></div>;
}
